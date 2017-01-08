/* eslint-disable brace-style */
/* eslint-disable camelcase */
request = require('request');

var Stage = require('../models/stages.js');

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
