var express = require('express');
var expressRouter = express.Router();
//Uses the dmca schema
var DMCASchema = require('./DMCASchema');

//for creating a new policy
expressRouter.post('/createPolicy', (req, res) =>{
    DMCASchema.findOne({policy: req.body.policy}) //searches by the policy body
    .then(entry =>{
        //if it is not already in the database, then it creates the new policy
        if(!entry){ 
            var addedEntry = new DMCASchema({
                policy: req.body.policy
                
            });
            //saves the policy in the database
            addedEntry.save().then(entry => res.json(entry)).catch(error => console.log(error));
        }
    });
});

//gets all policies in the database
expressRouter.get('/getPolicy', (req, res) => {
    DMCASchema.find().then(entries => res.json(entries)).catch(err => res.status(404));
});


//For updating the policies
expressRouter.post('/updatePolicy' , (req,res) =>{
   
   var oldPol = req.body.oldPol;
   var newPol = req.body.newPol;
   
   //Find dmca policy by it's body
    DMCASchema.findOne({policy: oldPol})
   .then(policy => {
       //If the policy is in the database, then it is able to be altered
       if(policy){
           policy.updateOne({policy: newPol}).then(policy => res.json(policy));
       }
   });
});



module.exports = expressRouter;