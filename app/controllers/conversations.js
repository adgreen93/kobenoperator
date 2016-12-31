/* eslint-disable brace-style */
/* eslint-disable camelcase */
var Stage = require('../models/stages.js');

module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, "Hey you. I'm Patron - a bot that does one beautiful thing: serve up good vibes by finding you good bars, coffee shops, and chill spots in NYC.");
    bot.reply(message, "Type in a 'hood or a price and we can get this thing started.")
  });

  // user said hello
  controller.hears(['1', '2', '3', '4','5'], 'message_received', function (bot, message) {

    Stage.findOne({ price: message.text }, function(err, stage) {
       var attachment = {
         "type":"template",
         "payload":{
           "template_type":"generic",
           "elements":[
              {
               "title":stage.title,
               "image_url":"https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-bot.png",
               "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". " + stage.subtitle,
               "buttons":[
                 {
                   "type":"web_url",
                   "url":"stage.url",
                   "title":"Directions to Bar"
                 },
                 {
                 'type':'postback',
                 'title':'Another Bar',
                 'payload': stage.price
                 }
               ]
             }
           ]
         }
       }
       bot.reply(message, {
           attachment: attachment,
       });
   });

  });

  controller.hears(['the creator'], 'message_received', function (bot, message) {

  });

  controller.hears(['start over'], 'message_received', function (bot, message) {
    bot.reply(message, "Hey you. I'm Patron - a bot that does one beautiful thing: serve up good vibes by finding you good bars, coffee shops, and chill spots in NYC.");
    bot.reply(message, "Type in a 'hood or a price and we can get this thing started.");
  });

  controller.hears(['tell me a joke'], 'message_received', function (bot, message) {
    bot.reply(message, 'Knock knock. Who is there? The futility of everything you do.');
  });

  controller.hears(['club', 'chill', 'date spot', 'college', 'dive', 'dance'], 'message_received', function (bot, message) {

      Stage.findOne({ type: message.text }, function(err, stage) {
         var attachment = {
           "type":"template",
           "payload":{
             "template_type":"generic",
             "elements":[
                {
                 "title":stage.title,
                 "image_url":"https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-bot.png",
                 "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". " + stage.subtitle,
                 "buttons":[
                   {
                     "type":"web_url",
                     "url":"stage.url",
                     "title":"Directions to Bar"
                   },
                   {
                   'type':'postback',
                   'title':'Another Bar',
                   'payload': stage.type
                   }
                 ]
               }
             ]
           }
         }
         bot.reply(message, {
             attachment: attachment,
         });
     });
  });


  controller.hears(['brooklyn', 'queens', 'manhattan'], 'message_received', function(bot, message){

     Stage.findOne({ borough: message.text }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":"https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-bot.png",
                "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". " + stage.subtitle,
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"stage.url",
                    "title":"Directions to Bar"
                  },
                  {
                  'type':'postback',
                  'title':'Another Bar',
                  'payload': message.text
                  }
                ]
              }
            ]
          }
        }
        bot.reply(message, {
            attachment: attachment,
        });
    });

  });

  controller.hears(['bar of the day'], 'message_received', function(bot, message){

     Stage.findOne({ borough: 'brooklyn' }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":"https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-bot.png",
                "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". " + stage.subtitle,
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"stage.url",
                    "title":"Directions to Bar"
                  },
                  {
                  'type':'postback',
                  'title':'Another Bar',
                  'payload':'brooklyn'
                  }
                ]
              }
            ]
          }
        }
        bot.reply(message, {
            attachment: attachment,
        });
    });

  });

  controller.hears(['long island'], 'message_received', function(bot, message){

     Stage.findOne({ borough: 'li' }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":"https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-bot.png",
                "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". " + stage.subtitle,
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"stage.url",
                    "title":"Directions to Bar"
                  },
                  {
                  'type':'postback',
                  'title':'Another Bar',
                  'payload':'another one'
                  }
                ]
              }
            ]
          }
        }
        bot.reply(message, {
            attachment: attachment,
        });
    });

  });

  controller.on('facebook_postback', function(bot, message) {

    if (message.payload == 'another one') {
        bot.reply(message, 'Check this one out!')
    }

    else if (message.payload == 'the creator') {
      var attachment = {
        "type":"template",
        "payload":{
          "template_type":"generic",
          "elements":[
             {
              "title": "Hi! I'm Alexander Green.",
              "image_url":"https://s3.amazonaws.com/aws-website-portfoliosite-bf6tr/patron-messenger-bot.png",
              "subtitle":"I made this bot. I'm an engineer, designer, and writer based in NYC.",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://petersfancybrownhats.com/company_image.png",
                  "title":"Peep the Portfolio"
                }
              ]
            }
          ]
        }
      }
      bot.reply(message, {
          attachment: attachment,
      });

    }

  });


  // user says anything else
  controller.hears('(.*)', 'message_received', function (bot, message) {
    bot.reply(message, 'you said ' + message.match[1])
  });
}
