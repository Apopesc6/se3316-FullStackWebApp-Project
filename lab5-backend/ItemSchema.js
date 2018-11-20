var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Schema used for each item
var ItemInfo = new Schema({
    //Item name is required
    itemName: {
        type:String,
        required: true
    },
    //Item quantity is required
    itemQuantity: {
        type: String,
        required: true
    },
    //Item price is required
    itemPrice: {
        type: String,
        required: true
    },
    //Item tax is NOT required
     itemTax: {
        type: String,
        required: false
    }
    
});

//exports the item schema for ItemDatabase to use
module.exports = ItemSchema = mongoose.model('ItemDatabase', ItemInfo);