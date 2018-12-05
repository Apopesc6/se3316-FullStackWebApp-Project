var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each manager
var ManagerInfo = new Schema({
    userName: {
        type:String,
        required: true
    }
    
});

//exports the manager schema for ManagerDatabase to use
module.exports = ManagerInfo = mongoose.model('ManagerDatabase', ManagerInfo);