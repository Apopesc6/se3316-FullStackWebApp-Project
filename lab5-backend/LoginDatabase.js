var express = require('express');
var expressRouter = express.Router();
//Uses the item schema
var LoginSchema = require('./LoginSchema');


expressRouter.post('/createUser', (req, res) =>{
    LoginSchema.findOne({userName: req.body.userName})
    .then(user =>{
        //if it is not already in the database, then it creates the new item
        if(!user){ //Gives it a name, quantity, price, and tax
            var addedUser = new LoginSchema({
                userName: req.body.userName,
                userPassword: req.body.userPassword,
                isActive: req.body.isActive
                
            });
            //saves the item in the database
            addedUser.save().then(user => res.json(user)).catch(error => console.log(error));
        }
    });
});

//For finding all of the items
expressRouter.get('/allUsers', (req, res) => {
    LoginSchema.find().then(users => res.json(users)).catch(err => res.status(404));
});

//For finding an individual item
expressRouter.get('/:user_name', (req,res) => {
    
   var userName = req.params.user_name;
   
    //Find item by its name 
   LoginSchema.findOne({userName}).then(user => res.json(user)).catch(err => res.status(404).json({usernotfound: 'Not user found'}));
   
});

//For updating the quantity
expressRouter.post('/updateActive' , (req,res) =>{
   
   var userName = req.body.userName;
   //Find item by its name 
   LoginSchema.findOne({userName})
   .then(user => {
       //If the item is in the database, then it is able to be altered
       if(user){
           user.updateOne({isActive: req.body.isActive}).then(user => res.json(user));
       }
   });
});

module.exports = expressRouter;