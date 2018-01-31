const express = require("express");
const router = express.Router();
const request = require("request");
require('dotenv').config();

//cycle is a mandatory value, that varies by election cycle
const cycle = "2016" 
//offset for pagination
const offset = 20;

function createCommitteeRequest(query, page) {
    let pageOffset = page*offset;
    const req = {
        'url': `https://api.propublica.org/campaign-finance/v1/${cycle}`,
        headers: {
            'X-API-KEY': process.env.PROPUBLICA_API_KEY
        }
    };
    req.url += `/committees/search.json?query=${query}&offset=${pageOffset}`;
    return req;
}

function getCommiteeData(committeeRequest) {
    return new Promise((resolve, reject) => {
        console.log(committeeRequest.url);
        request.get(committeeRequest, (err, committeeResponse, responseBody) => {
            if(err) {
                reject(err);
            } else {
                let parsedResponse = JSON.parse(responseBody);
                let propublicaResponse = {
                    committees: parsedResponse.results,
                    numCommittees: parsedResponse.num_results,
                    pages: Math.floor(parsedResponse.num_results / offset)
                };
                resolve(propublicaResponse);
            }
        });    
    });
}

// only works for committees
router.get('/', (req, res) => {
    let query = req.query.committee;
    let page = req.query.page;
    console.log(page);
    let committeeRequest = createCommitteeRequest(query, page);
    getCommiteeData(committeeRequest).then((committeeResponse) => {
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
