import { PageHeader } from "../../../../Library/Caches/typescript/2.6/node_modules/@types/react-bootstrap";

const jwt = require("jsonwebtoken");


/**
 * 1. Dont use password and other sensitive fields
 * 2. Use fields that are useful in other parts of the     
 * /app/collections/models
 * @param {*} user 
 */
function generateToken(user) {
    let userObject = {
        _id: user._id,
        username: user.email
    };

    let token = jwt.sign(userObject, process.env.JWT_SECRET, {
        expiresIn: 60*60*24   //expires in 24 hours
    });

    return token;
}

function generatePasswordResetToken() {

    
}

module.exports = {
    generateToken: generateToken
}