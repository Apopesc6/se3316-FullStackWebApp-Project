var express = require('express');
var expressRouter = express.Router();
//Uses the collection schema
var CollectionSchema = require('./CollectionSchema');

//For creating a collection in the database
expressRouter.post('/createCollection', (req, res) =>{
    CollectionSchema.findOne({collectionName: req.body.collectionName}) //searches by collection name to see if it's already in the database
    .then(collection =>{
        //if it is not already in the database, then it creates the new collection
        if(!collection){ 
            var addedCollection = new CollectionSchema({
                userName: req.body.userName,
                collectionName: req.body.collectionName,
                collectionDesc: req.body.collectionDesc,
                collectionData: req.body.collectionData,
                isPublic: req.body.isPublic
            });
            //saves the collection in the database
            addedCollection.save().then(collection => res.json(collection)).catch(error => console.log(error));
        }
    });
});

//For updating the collection name
expressRouter.post('/updateCollName' , (req,res) =>{
   
   //gets the old name and new name from the request
   var oldName = req.body.oldName;
   var newName = req.body.newName;
   
   //Finds the collection with the old name 
   CollectionSchema.findOne({collectionName: oldName})
   .then(collection => {
       //Changes it's name to the new name
       if(collection){
           collection.updateOne({collectionName: newName}).then(collection => res.json(collection));
       }
   });
});

//For updating the collection description
expressRouter.post('/updateCollDesc' , (req,res) =>{
   //gets the description and the name from the request
   var Name = req.body.collName;
   var newDesc = req.body.collDesc;
   
   //Find the collection by its name 
   CollectionSchema.findOne({collectionName: Name})
   .then(collection => {
       //If the collection is in the database, then it is able to be altered
       if(collection){
           collection.updateOne({collectionDesc: newDesc}).then(collection => res.json(collection));
       }
   });
});

//For updating the public/private status of the collection in the database
expressRouter.post('/updateCollPub' , (req,res) =>{
   
   var Name = req.body.collName;
   var newPub = req.body.collPub;
   
   //Find collection by its name 
   CollectionSchema.findOne({collectionName: Name})
   .then(collection => {
       //If the collection is in the database, then it is able to be altered
       if(collection){
           collection.updateOne({isPublic: newPub}).then(collection => res.json(collection));
       }
   });
});


//For deleting the collection
expressRouter.delete('/deleteCollection/:collection_name', (req, res) => {

    var collectiondelName = req.params.collection_name;
    
   //Find collection by its name 
   CollectionSchema.findOne({collectionName: collectiondelName})
   .then(collection => {
       //If the collection is in the database, then it is able to be removed
       if(collection){
           collection.remove().then( () => res.json({success: true}));
       }
       
   });
});


//For finding all of the collections
expressRouter.get('/allCollections', (req, res) => {
    CollectionSchema.find().then(collections => res.json(collections)).catch(err => res.status(404));
});


module.exports = expressRouter;