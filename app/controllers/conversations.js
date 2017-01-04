/* eslint-disable brace-style */
/* eslint-disable camelcase */
var Stage = require('../models/stages.js');

module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, "Hey you. I'm Patron - a bot that does one beautiful thing: serve up good vibes by finding you bars in NYC." + "Type in a borough name or a price (one to five, meaning cheap to expensive) and we'll get you drinking in no time.");

  });

  // user searches by price
  controller.hears(['1', '2', '3', '4', '5'], 'message_received', function (bot, message) {

    Stage.findOne({ price: message.text }, function(err, stage) {
       var attachment = {
         "type":"template",
         "payload":{
           "template_type":"generic",
           "elements":[
              {
               "title":stage.title,
               "image_url":stage.image_url,
               "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". ",
               "buttons":[
                 {
                   "type":"web_url",
                   "url": stage.direction_url,
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

  controller.hears(['the creator'], 'message_received', function (bot, message) {

  });

  controller.hears(['start over'], 'message_received', function (bot, message) {
    bot.reply(message, "Hey you. I'm Patron - a bot that does one beautiful thing: serve up good vibes by finding you bars in NYC." + "Type in a borough name or a price (one to five, from cheap to expensive) and we'll get you drinking in no time.");

  });

  controller.hears(['tell me a joke'], 'message_received', function (bot, message) {
    bot.reply(message, 'Knock knock. Who is there? The futility of everything you do.');
  });

  controller.hears(['club', 'chill', 'date spot', 'college', 'dive', 'dancing'], 'message_received', function (bot, message) {

      Stage.findOne({ type: message.text }, function(err, stage) {
         var attachment = {
           "type":"template",
           "payload":{
             "template_type":"generic",
             "elements":[
                {
                 "title":stage.title,
                 "image_url":stage.image_url,
                 "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". ",
                 "buttons":[
                   {
                     "type":"web_url",
                     "url": stage.direction_url,
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

    var clean_borough = message.text.toLowerCase();
     Stage.findOne({ borough: clean_borough }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":stage.image_url,
                "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". ",
                "buttons":[
                  {
                    "type":"web_url",
                    "url": stage.direction_url,
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

    var barday = ['club', 'chill', 'date spot', 'college', 'dive', 'dance']
    var random_search = barday[Math.floor(Math.random() * barday.length)];
    console.log("********RANDOM SEARCH RESULT******" + random_search)
     Stage.findOne({ type: random_search }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":stage.image_url,
                "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". ",
                "buttons":[
                  {
                    "type":"web_url",
                    "url": stage.direction_url,
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

  controller.hears(['long island', 'li'], 'message_received', function(bot, message){

     Stage.findOne({ borough: 'li' }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":stage.image_url,
                "subtitle":"Price: " + stage.price + ", " + stage.address + ". " + stage.type + ". ",
                "buttons":[
                  {
                    "type":"web_url",
                    "url": stage.direction_url,
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
                  "title":"Check the Portfolio"
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

    var response_messages = [". We can't help you there, so sorry about that. Let's move on.", ". See a doctor about that.", ". Not sure how to process that."]
    var item = response_messages[Math.floor(Math.random()*response_messages.length)];
    bot.reply(message, 'You said ' + message.match[1] + item)
  });
}
