const express = require("express");
const router = express.Router();
const request = require("request");

//cycle is a mandatory value, that varies by election cycle
const cycle = "2016" 
const options = {
    headers: {
        'url': `https://api.propublica.org/campaign-finance/v1/${cycle}`,
        'X-API-KEY': process.env.SPOTLIGHT_API_KEY
    }
};

// technically only works for committees
router.get('/search', (req, res) => {

    let query = req.body.query;
    options.headers.url += `/committees/search.json?query=${query}`;

    request.get(options, (err, res, body) => {
        if(err) {
            console.log(err);
            return err;
        }
        console.log(res);
    });
});

module.exports = router;
