var express = require('express');
var expressRouter = express.Router();
//Uses the item schema
var RatingSchema = require('./RatingSchema');

expressRouter.post('/createRating', (req, res) =>{
    RatingSchema.findOne({userComment: req.body.userComment})
    .then(rating =>{
        //if it is not already in the database, then it creates the new item
        if(!rating){ //Gives it a name, quantity, price, and tax
            var addedRating = new RatingSchema({
                userName: req.body.userName,
                itemName: req.body.itemName,
                userComment: req.body.userComment,
                userRating: req.body.userRating
                
            });
            //saves the item in the database
            addedRating.save().then(rating => res.json(rating)).catch(error => console.log(error));
        }
    });
});



//change this to get all and then sort by item name
expressRouter.get('/allRatings', (req, res) => {
    RatingSchema.find().then(rating => res.json(rating)).catch(err => res.status(404));
});

module.exports = expressRouter;