// app/models/stages.js
// load the things we need
var mongoose = require('mongoose');

//title is name of bar
//image is the image that comes with the search result
//price can be from one to five, its represented as $$$$$

// define the schema for our bar model
var stageSchema = mongoose.Schema({

    title  : String,
    image_url : String,
    borough: String,
    address: String,
    direction_url: String,
    price: { type: Number, min: 1, max: 5 },
    type: String

});

// create the model for bars and expose it to our app
module.exports = mongoose.model('Stage', stageSchema);
