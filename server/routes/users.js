const express = require("express");
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const User = require("../models/User");
const router = express.Router();
const utils = require('../utils/spotlightUtils');


mongoose.createConnection('mongodb://localhost/spotlight');

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({'email' : username}, (err, user) => {
        if(err) {
            return res.status(401).json({
                success: false,
                message: "There was an error submitting your credentials"
            });
        }
        else if(user === null) {
            return res.status(401).json({
                success: false,
                message: "Username or password invalid"
            });
        }
        else {
            bcrypt.compare(req.body.password, user.password, (err, valid) => {
                if(!valid) {
                    res.status(401).json({
                        error: true,
                        message: "User"
                    });
                }

                let jwtToken = utils.generateToken(user);

                res.status(200).json({
                    success: true,
                    err: null,
                    token: jwtToken,
                    message: "You have been authenticated"
                });
            });
        }
    });
});

router.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({'email' : username}, (err, user) => {
        if(err) {
            res.status(401).json({
                success: false,
                token: null,
                message: "Error processing signup, please try again"
            });
        }
       else if(user) {
            res.status(401).json({
                success: false,
                token: null,
                message: "A user already exists with this username"
            });
        }

        bcrypt.hash(password, null, null, (err, hash) => {
            let newUser = new User();
            newUser.email = username;
            newUser.password = hash
            
            newUser.save((err) => {
                if(err) {
                    res.status(401).json({
                        success: false,
                        token: null,
                        message: "There was an error saving you to the service"
                    });           
                }
                res.status(200).json({
                    success: true,
                    token: null,
                    err: null
                });
            });
        });
    });
});

// router.get('/', jwtMW /* Using the express jwt MW here */, (req, res) => {
//     res.send('You are authenticated'); //Sending some response when authenticated
// });



module.exports = router;