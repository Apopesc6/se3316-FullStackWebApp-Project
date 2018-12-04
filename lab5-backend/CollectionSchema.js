var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var CollectionInfo = new Schema({
    //Item name is required
    userName: {
        type:String,
        required: true
    },
    //Item quantity is required
    collectionName: {
        type: String,
        required: true
    },
    collectionDesc: {
        type:String,
        required: true
    },
    //Item price is required
    collectionData: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    }
    
});

//exports the item schema for ItemDatabase to use
module.exports = CollectionSchema = mongoose.model('CollectionDatabase', CollectionInfo);