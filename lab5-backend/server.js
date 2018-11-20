//online database from mLab
var database = 'mongodb://apopesc6:apopesc6@ds133920.mlab.com:33920/se3316-popescu-lab3';
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var items = require('./ItemDatabase');
var expressApp = express();

//Using mongoose to connect to mongoDB
mongoose
    .connect(database)
    .then(() => console.log("MongoDB database connected"))
    .catch(err => console.log(err));
    
//Allows for the use of GET POST PUT DELETE AND OPTIONS methods
expressApp.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE, GET, OPTIONS');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

//Used for body parsing the middleware
expressApp.use(bodyParser.urlencoded({extended:false}));
expressApp.use(bodyParser.json());
//Uses the api within the ItemDatabase.js file
expressApp.use('/api/ItemDatabase', items);
//Starts listnening
expressApp.listen(8081);