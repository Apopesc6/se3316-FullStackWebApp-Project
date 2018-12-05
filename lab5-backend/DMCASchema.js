var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each dmca policy
var DMCAInfo = new Schema({
    policy: {
        type:String,
        required: true
    }
    
});

//exports the item schema for DMCADatabase to use
module.exports = DMCAInfo = mongoose.model('DMCADatabase', DMCAInfo);