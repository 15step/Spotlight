const express = require("express");
const router = express.Router();
const request = require("request");
require('dotenv').config();

//cycle is a mandatory value, that varies by election cycle
const cycle = "2016" 

function createCommitteeRequest(query) {
    const req = {
        'url': `https://api.propublica.org/campaign-finance/v1/${cycle}`,
        headers: {
            'X-API-KEY': process.env.PROPUBLICA_API_KEY
        }
    };
    req.url += `/committees/search.json?query=${query}`;
    
    return req;
}

// technically only works for committees
router.get('/', (req, res) => {
    let query = req.query.committee;
        let committeeRequest = createCommitteeRequest(query);
    try {
        request.get(committeeRequest, (err, committeeResponse, responseBody) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    results: null,
                    err: "Error processing request"
                });
            }
            let commitees = JSON.parse(responseBody).results
        
            return res.status(200).json({
                success: true,
                results: commitees,
                err: null
            });
        });    
    } catch(e) {
        throw e;
    }
});

module.exports = router;
