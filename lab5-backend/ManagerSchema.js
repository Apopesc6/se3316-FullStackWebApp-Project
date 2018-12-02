var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var ManagerInfo = new Schema({
    //Item name is required
    userName: {
        type:String,
        required: true
    }
    
});

//exports the item schema for ItemDatabase to use
module.exports = ManagerInfo = mongoose.model('ManagerDatabase', ManagerInfo);