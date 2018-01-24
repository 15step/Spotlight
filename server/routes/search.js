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
    req.url += `/committees/search.json?query=${query}&offset=${offset}`;
    return req;
}

function getCommiteeData(request, offset, pages = 0) {
    let offset = 20;
    request.get(request, (err, committeeResponse, responseBody) => {
        if(err) {
            return null
        }
        let results = JSON.parse(responseBody).results;
        let pages = Math.ceil(results.num_results % offset);

       for(let i = 0; i < pages; i++) {
            
       }
    
        return res.status(200).json({
            success: true,
            results: committees,
            err: null
        });
    });    
}

// technically only works for committees
router.get('/', (req, res) => {
    let query = req.query.committee;
    let committeeRequest = createCommitteeRequest(query);
    let offset = 20;
    let foo = getCommiteeData(committeeRequest, offset);
    if(foo == null) {
        return res.status(500).json({
            success: false,
            results: null,
            err: "Error processing request"
        });
    }
    else {

    }


});

module.exports = router;
