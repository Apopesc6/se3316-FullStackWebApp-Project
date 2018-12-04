var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var SecurityInfo = new Schema({
    //Item name is required
    policy: {
        type:String,
        required: true
    }
    
});

//exports the item schema for ItemDatabase to use
module.exports = SecurityInfo = mongoose.model('SecurityDatabase', SecurityInfo);