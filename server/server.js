const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');

const app = express();

// instantiating routes
const configRoutes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/spotlight');

configRoutes(app);


//MongoDB Mongoose Connection


// Instantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});