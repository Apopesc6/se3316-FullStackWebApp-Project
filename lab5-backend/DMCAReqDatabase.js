var express = require('express');
var expressRouter = express.Router();
//Uses the item schema
var DMCAReqSchema = require('./DMCAReqSchema');

expressRouter.post('/createEntry', (req, res) =>{
    DMCAReqSchema.findOne({entry: req.body.entry})
    .then(entry =>{
        //if it is not already in the database, then it creates the new item
        if(!entry){ //Gives it a name, quantity, price, and tax
            var addedEntry = new DMCAReqSchema({
                entry: req.body.entry,
                ReqType: req.body.ReqType
                
            });
            //saves the item in the database
            addedEntry.save().then(entry => res.json(entry)).catch(error => console.log(error));
        }
    });
});


expressRouter.get('/getEntries', (req, res) => {
    DMCAReqSchema.find().then(entries => res.json(entries)).catch(err => res.status(404));
});




module.exports = expressRouter;