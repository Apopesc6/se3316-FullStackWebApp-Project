var express = require('express');
var expressRouter = express.Router();
//Uses the item schema
var CollectionSchema = require('./CollectionSchema');

//For creating items within the database
expressRouter.post('/createCollection', (req, res) =>{
    CollectionSchema.findOne({collectionName: req.body.collectionName})
    .then(collection =>{
        //if it is not already in the database, then it creates the new item
        if(!collection){ //Gives it a name, quantity, price, and tax
            var addedCollection = new CollectionSchema({
                userName: req.body.userName,
                collectionName: req.body.collectionName,
                collectionDesc: req.body.collectionDesc,
                collectionData: req.body.collectionData,
                isPublic: req.body.isPublic
            });
            //saves the item in the database
            addedCollection.save().then(collection => res.json(collection)).catch(error => console.log(error));
        }
    });
});


expressRouter.post('/updateCollName' , (req,res) =>{
   
   var oldName = req.body.oldName;
   var newName = req.body.newName;
   
   //Find item by its name 
   CollectionSchema.findOne({collectionName: oldName})
   .then(collection => {
       //If the item is in the database, then it is able to be altered
       if(collection){
           collection.updateOne({collectionName: newName}).then(collection => res.json(collection));
       }
   });
});


expressRouter.post('/updateCollDesc' , (req,res) =>{
   
   var Name = req.body.collName;
   var newDesc = req.body.collDesc;
   
   //Find item by its name 
   CollectionSchema.findOne({collectionName: Name})
   .then(collection => {
       //If the item is in the database, then it is able to be altered
       if(collection){
           collection.updateOne({collectionDesc: newDesc}).then(collection => res.json(collection));
       }
   });
});


expressRouter.post('/updateCollPub' , (req,res) =>{
   
   var Name = req.body.collName;
   var newPub = req.body.collPub;
   
   //Find item by its name 
   CollectionSchema.findOne({collectionName: Name})
   .then(collection => {
       //If the item is in the database, then it is able to be altered
       if(collection){
           collection.updateOne({isPublic: newPub}).then(collection => res.json(collection));
       }
   });
});


//For deleting the items
expressRouter.delete('/deleteCollection/:collection_name', (req, res) => {

    var collectiondelName = req.params.collection_name;
    
   //Find item by its name 
   CollectionSchema.findOne({collectionName: collectiondelName})
   .then(collection => {
       //If the item is in the database, then it is able to be removed
       if(collection){
           collection.remove().then( () => res.json({success: true}));
       }
       
   });
});


//For finding all of the items
expressRouter.get('/allCollections', (req, res) => {
    CollectionSchema.find().then(collections => res.json(collections)).catch(err => res.status(404));
});


module.exports = expressRouter;