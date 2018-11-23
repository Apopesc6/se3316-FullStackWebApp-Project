var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var LoginInfo = new Schema({
    //Item name is required
    userName: {
        type:String,
        required: true
    },
    //Item quantity is required
    userPassword: {
        type: String,
        required: true
    }
    
});

//exports the item schema for ItemDatabase to use
module.exports = LoginInfo = mongoose.model('LoginDatabase', LoginInfo);