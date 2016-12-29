// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var stageSchema = mongoose.Schema({

    title  : String,
    image_url : String,
    borough: String,
    address: String,
    price: { type: Number, min: 1, max: 5 },
    type: String,
    subtitle : String

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Stage', stageSchema);


//title is name of bar
//image is the image that comes with the search result
//price can be from one to five, its represented as $$$$$