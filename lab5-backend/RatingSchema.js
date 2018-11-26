var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var RatingInfo = new Schema({
    //Item name is required
    userName: {
        type:String,
        required: true
    },
    //Item quantity is required
    itemName: {
        type: String,
        required: true
    },
    userComment:{
        type: String,
        required: true
    },
    userRating:{
        type: Number,
        required: true
    }
});

//exports the item schema for ItemDatabase to use
module.exports = RatingInfo = mongoose.model('RatingDatabase', RatingInfo);