var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each user
var LoginInfo = new Schema({
    userName: {
        type:String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        required: true
    }
    
});

//exports the user schema for LoginDatabase to use
module.exports = LoginInfo = mongoose.model('LoginDatabase', LoginInfo);