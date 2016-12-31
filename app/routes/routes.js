/* eslint-disable brace-style */
/* eslint-disable camelcase */
request = require('request');

var Stage = require('../models/stages.js');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var client = require('twilio')('AC130c4d0a94aba1934a47715ad45dd058', '7a3bb073acfa9082809f85ea64798ff0');

var facebook_handler = require('../controllers/botkit').handler

module.exports = function (app) {
  // public pages=============================================
  // root
  app.get('/', function (req, res) {
    Stage.find(function(err, stages) {
          res.render('home', { stages: stages});

     });

  });

  app.get('/maker', function (req, res) {
    Stage.find(function(err, stages) {
          res.render('maker', { stages: stages});

     });

  });

  app.post('/text', function(req, res, next) {

    console.log(req.body.name);
    res.send('success');

    client.sms.messages.post({
      to:'+16464036251',
      from:'+19177461368',
      body:req.body.name
    }, function(err, text) {
      console.log('You sent: '+ text.body);
      console.log('Current status of this text message is: '+ text.status);
    });

  });

  app.post('/stages', function(req, res){

    Stage.create({
            title  : req.body.title,
            image_url : req.body.image_url,
            direction_url : req.body.direction_url,
            type: req.body.type,
            price: req.body.price,
            address: req.body.address,
            borough: req.body.borough
        }, function(err, stage) {
            if (err)
                res.sendStatus(err);
            else {
      return res.send('Success.');
    }
        });
  });


  app.get('/webhook', function (req, res) {
    // This enables subscription to the webhooks
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FACEBOOK_VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query['hub.challenge']);

    }
    else {
      res.send('Incorrect verify token');
      console.error("Failed validation. Make sure the validation tokens match.");
    }
  });

  app.post('/webhook', function (req, res) {
    facebook_handler(req.body);
    res.send('ok')

  });

}
