var express = require('express');
var expressRouter = express.Router();
//Uses the log in schema
var LoginSchema = require('./LoginSchema');


expressRouter.post('/createUser', (req, res) =>{
    LoginSchema.findOne({userName: req.body.userName})
    .then(user =>{
        //if it is not already in the database, then it creates the new user
        if(!user){ //stores the username, the email, the password, and a boolean if the user is active
            var addedUser = new LoginSchema({
                userName: req.body.userName,
                userPassword: req.body.userPassword,
                isActive: req.body.isActive
                
            });
            //saves the user in the database
            addedUser.save().then(user => res.json(user)).catch(error => console.log(error));
        }else{
            return res.json({userName: 'Item already exists'});
        }
    });
});

//For finding all of the users
expressRouter.get('/allUsers', (req, res) => {
    LoginSchema.find().then(users => res.json(users)).catch(err => res.status(404));
});

//For finding an individual user
expressRouter.get('/:user_name', (req,res) => {
    
   var userName = req.params.user_name;
    //Finds the user by its email 
   LoginSchema.findOne({userName}).then(user => res.json(user)).catch(err => res.status(404).json({usernotfound: 'Not user found'}));
   
});

//For updating if the user is active or not
expressRouter.post('/updateActive' , (req,res) =>{
   
   //gets the email from the request
   var userName = req.body.userName;
   //Find user by its email 
   LoginSchema.findOne({userName})
   .then(user => {
       //If the user is in the database, then it is able to be altered. (The boolean isActive is changed)
       if(user){
           user.updateOne({isActive: req.body.isActive}).then(user => res.json(user));
       }
   });
});

module.exports = expressRouter;