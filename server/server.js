"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var port = 3000;
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
