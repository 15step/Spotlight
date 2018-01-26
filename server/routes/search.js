const express = require("express");
const router = express.Router();
const request = require("request");
require('dotenv').config();

//cycle is a mandatory value, that varies by election cycle
const cycle = "2016" 

function createCommitteeRequest(query) {
    const offset = 20;
    const req = {
        'url': `https://api.propublica.org/campaign-finance/v1/${cycle}`,
        headers: {
            'X-API-KEY': process.env.PROPUBLICA_API_KEY
        }
    };
    req.url += `/committees/search.json?query=${query}&offset=${offset}`;
    return req;
}

function getCommiteeData(committeeRequest) {
    return new Promise((resolve, reject) => {
        request.get(committeeRequest, (err, committeeResponse, responseBody) => {
            if(err) {
                reject(err);
            } else {
                let parsedResponse = JSON.parse(responseBody);
                let propublicaResponse = {
                    committees: parsedResponse.results,
                    numCommittees: parsedResponse.num_results
                };
                resolve(propublicaResponse);
            }
        });    
    });
}

// only works for committees
router.get('/', (req, res) => {
    let query = req.query.committee;
    let committeeRequest = createCommitteeRequest(query);
    let offset = 20;
    getCommiteeData(committeeRequest, offset).then((committeeResponse) => {
        return res.status(200).json({
            success: true,
            results: committeeResponse,
            err: null
        });
    }).catch((err) => {
        return res.status(500).json({
            success: false,
            results: null,
            err: err
        });
    });
});

module.exports = router;
