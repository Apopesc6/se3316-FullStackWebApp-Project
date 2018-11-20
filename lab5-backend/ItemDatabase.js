var express = require('express');
var expressRouter = express.Router();
//Uses the item schema
var ItemSchema = require('./ItemSchema');

//For creating items within the database
expressRouter.post('/createItem', (req, res) =>{
    ItemSchema.findOne({itemName: req.body.itemName})
    .then(item =>{
        //if it is not already in the database, then it creates the new item
        if(!item){ //Gives it a name, quantity, price, and tax
            var addedItem = new ItemSchema({
                itemName: req.body.itemName,
                itemQuantity:req.body.itemQuantity,
                itemPrice:req.body.itemPrice,
                itemTax:req.body.itemTax
            });
            //saves the item in the database
            addedItem.save().then(item => res.json(item)).catch(error => console.log(error));
        }
    });
});

//For deleting the items
expressRouter.delete('/deleteItem', (req, res) => {

    var itemName = req.body.itemName;
   
   //Find item by its name 
   ItemSchema.findOne({itemName})
   .then(item => {
       //If the item is in the database, then it is able to be removed
       if(item){
           item.remove().then( () => res.json({success: true}));
       }
       
   });
});

//For updating the items
expressRouter.post('/updateItemTax' , (req,res) =>{
   
   var itemName = req.body.itemName;
   
   //Find item by its name
   ItemSchema.findOne({itemName})
   .then(item => {
       //If the item is in the database, then it is able to be altered
       if(item){
           item.updateOne({itemTax: req.body.itemTax}).then(item => res.json(item));
       }
   });
});

//For updating the quantity
expressRouter.post('/updateItemQuantity' , (req,res) =>{
   
   var itemName = req.body.itemName;
   //Find item by its name 
   ItemSchema.findOne({itemName})
   .then(item => {
       //If the item is in the database, then it is able to be altered
       if(item){
           item.updateOne({itemQuantity: req.body.itemQuantity}).then(item => res.json(item));
       }
   });
});

//For finding all of the items
expressRouter.get('/allItems', (req, res) => {
    ItemSchema.find().then(items => res.json(items)).catch(err => res.status(404));
});

//For finding an individual item
expressRouter.get('/:item_name', (req,res) => {
    
   var itemName = req.params.item_name;
   
    //Find item by its name 
   ItemSchema.findOne({itemName}).then(item => res.json(item)).catch(err => res.status(404).json({itemnotfound: 'Not item found'}));
   
});

module.exports = expressRouter;