const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SPOTLIGHT_EMAIL_ADDRESS,
        pass: process.env.SPOTLIGHT_EMAIL_PASSWORD
    }
});

function composeEmailOptions(token) {

    let emailText = `Below is your temporary token to reset Spotlight your password. ` + 
                    `Please navigate over to Spotlight to reset your password at your earliest ` +
                    `convenience. \n\n ${token}`;
    let mailOptions = {
        from: "mjp529@gmail.com",
        to: "mjp529@gmail.com",
        subject: "Password Reset",
        text: emailText
    };
    return mailOptions;
}

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
    let token = Math.floor(Math.random()*900000) + 100000;
    return token;
}

function sendPasswordReset() {
    let token = generatePasswordResetToken();
    let mailOptions = composeEmailOptions(token);

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Email sent");
        }
    });  
}

module.exports = {
    generateToken: generateToken,
    generatePasswordResetToken: generatePasswordResetToken,
    sendPasswordReset: sendPasswordReset
}