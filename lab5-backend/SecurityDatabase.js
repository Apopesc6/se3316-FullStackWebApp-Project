var express = require('express');
var expressRouter = express.Router();
//Uses the security schema
var SecuritySchema = require('./SecuritySchema');

expressRouter.post('/createPolicy', (req, res) =>{
    SecuritySchema.findOne({policy: req.body.policy})
    .then(entry =>{
        //if it is not already in the database, then it creates the new policy
        if(!entry){
            var addedEntry = new SecuritySchema({
                policy: req.body.policy
                
            });
            //saves the policy in the database
            addedEntry.save().then(entry => res.json(entry)).catch(error => console.log(error));
        }
    });
});

//gets all the policies in the database
expressRouter.get('/getPolicy', (req, res) => {
    SecuritySchema.find().then(entries => res.json(entries)).catch(err => res.status(404));
});


//For updating the policy
expressRouter.post('/updatePolicy' , (req,res) =>{
   
   var oldPol = req.body.oldPol;
   var newPol = req.body.newPol;
   
   //Find the policy by its old body
    SecuritySchema.findOne({policy: oldPol})
   .then(policy => {
       //If the policy is in the database, then it is able to be altered
       if(policy){
           policy.updateOne({policy: newPol}).then(policy => res.json(policy));
       }
   });
});



module.exports = expressRouter;