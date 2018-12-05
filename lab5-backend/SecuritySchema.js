var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each security policy
var SecurityInfo = new Schema({
    policy: {
        type:String,
        required: true
    }
    
});

//exports the security schema for SecurityDatabase to use
module.exports = SecurityInfo = mongoose.model('SecurityDatabase', SecurityInfo);