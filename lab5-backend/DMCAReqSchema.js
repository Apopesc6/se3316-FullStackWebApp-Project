var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var DMCAReqInfo = new Schema({
    //Item name is required
    entry: {
        type:String,
        required: true
    },
    ReqType: {
        type:String,
        required:true
    }
    
});

//exports the item schema for ItemDatabase to use
module.exports = DMCAReqInfo = mongoose.model('DMCAReqDatabase', DMCAReqInfo);