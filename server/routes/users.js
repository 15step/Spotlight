const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const User = require("../models/User");
const router = express.Router();
const utils = require('../utils/spotlightUtils');


mongoose.connect('mongodb://localhost/spotlight', {
    useMongoClient: true
});

router.get("/profile/:id", (req, res) => {
    let userId = req.params.id;
    console.log(userId);
    User.findOne({'_id' : userId}, (err, user) => {
        if(err) {
            return res.status(500).json({
                success: false,
                message: "Error retreving user data"
            });
        }
        else if(user === null) {
            return res.status(401).json({
                success: false,
                message: "Username or password invalid"
            });
        }
        else {
            let userData = {
                email: user.email,
                name: user.profile.name,
                location: user.profile.location
            };

            return res.status(200).json({
                success: true,
                userData
            });
        }
    })
});

router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    
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
        else if(user.passwordResetToken !== null) { //user resetting password
            bcrypt.compare(password, user.passwordResetToken, (err, valid) => {
                console.log(valid)
                console.log(`user.passwordResetToken: ${user.passwordResetToken}`);                
                if(!valid) {
                    console.log("reset token not valid!")                    
                    return res.status(401).json({
                        success: false,
                        error: true
                    });
                }
                return res.status(200).json({
                    success: true,
                    resetPassword: true
                });
            })
        }
        else {
            bcrypt.compare(password, user.password, (err, valid) => {
                if(!valid) {
                    console.log('not valid');
                    return res.status(401).json({
                        success: false,
                        error: true
                    });
                }

                let jwtToken = utils.generateToken(user);
                console.log("we did it!"); 
                return res.status(200).json({
                    success: true,
                    err: null,
                    token: jwtToken,
                    userId: user._id,
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
            return res.status(401).json({
                success: false,
                token: null,
                message: "Error processing signup, please try again"
            });
        }
       else if(user) {
            return res.status(401).json({
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
                    return res.status(401).json({
                        success: false,
                        token: null,
                        message: "There was an error saving you to the service"
                    });           
                }
                return res.status(200).json({
                    success: true,
                    token: null,
                    err: null
                });
            });
        });
    });
});

router.post("/password-reset", (req, res) => {
    const email = req.body.email;

    User.findOne({'email' : email}, (err, user) => {
        if(err) {
            return res.status(200).json({
                success: true
            });
        }
        else if(user === null) {
            return res.status(200).json({
                success: true
            });
        }
       else if(user) {
           let token = utils.generatePasswordResetToken(); 
           bcrypt.hash(token, null, null, (err, hash) => {
               User.update({'email' : user.email}, { passwordResetToken : hash }, (err, cb) => {
                   if(err) {
                       console.log(err);
                    } else {
                        utils.sendPasswordReset(token);           
                        return res.status(200).json({
                            success: true
                        });
                    }
                });
           });
        }
    });
});

router.post("new-password", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, null, null, (err, hash) => {
        User.findOneAndUpdate({'email' : username}, { $set: { password : hash, passwordResetToken: null }}, (err, user) => {
            if(err) {
                return res.status(401).json({
                    success: false
                });
            }
            else if(user === null) {
                return res.status(401).json({
                    success: true
                });
            }
            else if(user) {
                return res.status(200).json({
                    success: true
                });
            }
        });
    });
});

module.exports = router;