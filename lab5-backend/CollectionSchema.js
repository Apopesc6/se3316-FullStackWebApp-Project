var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each collection
var CollectionInfo = new Schema({
    userName: {
        type:String,
        required: true
    },
    collectionName: {
        type: String,
        required: true
    },
    collectionDesc: {
        type:String,
        required: true
    },
    collectionData: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    }
    
});

//exports the collection schema for CollectionDatabase to use
module.exports = CollectionSchema = mongoose.model('CollectionDatabase', CollectionInfo);