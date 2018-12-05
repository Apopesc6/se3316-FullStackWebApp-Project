var express = require('express');
var expressRouter = express.Router();
//Uses the DMCAreq schema (schema for requests, notices, and disputes)
var DMCAReqSchema = require('./DMCAReqSchema');

expressRouter.post('/createEntry', (req, res) =>{
    DMCAReqSchema.findOne({entry: req.body.entry})
    .then(entry =>{
        //if it is not already in the database, then it creates the new entry
        if(!entry){ //stores the entry type as long as the entry itself 
            var addedEntry = new DMCAReqSchema({
                entry: req.body.entry,
                ReqType: req.body.ReqType //can be either "request", "notice", or "dispute"
                
            });
            //saves the entry in the database
            addedEntry.save().then(entry => res.json(entry)).catch(error => console.log(error));
        }
    });
});

//for getting all entries.
expressRouter.get('/getEntries', (req, res) => {
    DMCAReqSchema.find().then(entries => res.json(entries)).catch(err => res.status(404));
});




module.exports = expressRouter;