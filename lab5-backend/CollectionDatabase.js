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
                collectionData: req.body.collectionData,
                isPublic: req.body.isPublic
            });
            //saves the item in the database
            addedCollection.save().then(collection => res.json(collection)).catch(error => console.log(error));
        }
    });
});

//For finding all of the items
expressRouter.get('/allCollections', (req, res) => {
    CollectionSchema.find().then(collections => res.json(collections)).catch(err => res.status(404));
});


module.exports = expressRouter;