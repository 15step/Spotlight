const express = require("express");
const router = express.Router();
const request = require("request");
require('dotenv').config();

//cycle is a mandatory value, that varies by election cycle
const cycle = "2016" 
const options = {
    'url': `https://api.propublica.org/campaign-finance/v1/${cycle}`,
    headers: {
        'X-API-KEY': process.env.PROPUBLICA_API_KEY
    }
};

// technically only works for committees
router.get('/', (req, res) => {
    let query = req.query.contributor;
    console.log(query);
    options.url += `/committees/search.json?query=${query}`;
    console.log(options)
    request.get(options, (err, res, body) => {
        if(err) {
            console.log('I erred');
            return err;
        }
        console.log(body);
    });
});

module.exports = router;
