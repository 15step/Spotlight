const express = require("express");
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const bcrypt = require('bcrypt-nodejs');
const userCollection = "../models/User";
const router = express.Router();



router.post("/login", (req, res) => {
    console.log("Hello from login");
    const username = req.body.username;
    const password = req.body.password;

    userCollection.findOne({'email' : username}, (err, user) => {
        if(err) {
            res.status(401).json({
                success: false,
                token: null,
                err: "Username or password invalid"
            });
        }
        let jwtToken = jwt.sign({ 
            id: user._id,
             username: user.email
            },
            'keyboard cat 4 ever',
            {expiresIn: 129600});

        
        res.status(200).json({
            success: true,
            err: null,
            token: jwtToken
        });
    });
});

router.post("/signup", (req, res) => {
    console.log("Hello from signup");
    const username = req.body.username;
    const password = req.body.password;

    userCollection.findOne({'email' : username}, (err, user) => {
        if(err) {
            res.status(401).json({
                success: false,
                token: null,
                err: "Error processing signup, please try again"
            });
        }
       else if(user) {
            res.status(401).json({
                success: false,
                token: null,
                err: "A user already exists with this username"
            });
        }

        bcrypt.hash(password, null, null, (err, hash) => {
            let newUser = {
                email: username,
                password: hash
            };
            
            userCollection.save((err) => {
                if(err) {
                    res.status(401).json({
                        success: false,
                        token: null,
                        err: "There was an error saving you to the service"
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