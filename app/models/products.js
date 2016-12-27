// /models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var productSchema = mongoose.Schema({

    productName  : String,
    productDescription  : String,
    productPrice : Number

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Product', productSchema);
