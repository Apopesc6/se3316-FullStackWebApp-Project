var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each dmca request, notice, or dispute
var DMCAReqInfo = new Schema({
    entry: {
        type:String,
        required: true
    },
    ReqType: {
        type:String,
        required:true
    }
    
});

//exports the item schema for DMCAReqDatabase to use
module.exports = DMCAReqInfo = mongoose.model('DMCAReqDatabase', DMCAReqInfo);