var express = require('express');
var expressRouter = express.Router();
//Uses the item schema
var ManagerSchema = require('./ManagerSchema');

expressRouter.post('/createAdmin', (req, res) =>{
    ManagerSchema.findOne({userName: req.body.userName})
    .then(manager =>{
        //if it is not already in the database, then it creates the new item
        if(!manager){ //Gives it a name, quantity, price, and tax
            var addedUser = new ManagerSchema({
                userName: req.body.userName
                
            });
            //saves the item in the database
            addedUser.save().then(manager => res.json(manager)).catch(error => console.log(error));
        }
    });
});

module.exports = expressRouter;