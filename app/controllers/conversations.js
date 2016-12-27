/* eslint-disable brace-style */
/* eslint-disable camelcase */
var Stage = require('../models/stages.js');

module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, "Hey you. I'm a bot that does one beautiful thing: serve up good vibes by finding you good bars, coffee shops, and chill spots in NYC. Type in a 'hood and we can get this thing started.")
  });

  // user said hello
  controller.hears(['hello'], 'message_received', function (bot, message) {
    bot.reply(message, 'You know, personally, I could never say this to anyone but you ' + message.user + 'but go eat an egg.');

  });

  controller.hears(['tell me a joke'], 'message_received', function (bot, message) {
    bot.reply(message, 'Knock knock. Who is there? The futility of everything you do.');
  });

  controller.hears(['brooklyn', 'queens', 'manhattan'], 'message_received', function(bot, message){
     console.log("*******HERES THE MESSAGE" + message.text + "*******HERES THE MESSAGE")
     Stage.findOne({ borough: message.text }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":"https://petersfancybrownhats.com/company_image.png",
                "subtitle": "Price: " + stage.price + ", "  + stage.subtitle ,
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

  controller.hears(['$', '$$', '$$$', '$$$$', '$$$$$'], 'message_received', function(bot, message){
     console.log("*******HERES THE MESSAGE" + message.text + "*******HERES THE MESSAGE")

     if (message.text == '$') {
       calculated_price = 1
     }
     else if (message.text == '$$') {
       calculated_price = 2
     }
     else if (message.text == '$$$') {
       calculated_price = 3
     }
     else if (message.text == '$$$$') {
       calculated_price = 4
     }
     else if (message.text == '$$$$$') {
       calculated_price = 5
     }
     else {
       calculated_price = 1
     }

     console.log(calculated_price)

     Stage.findOne({ price: calculated_price }, function(err, stage) {

        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":"https://petersfancybrownhats.com/company_image.png",
                "subtitle": "Price: " + stage.price + " "  + stage.subtitle ,
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

  controller.hears(['long island'], 'message_received', function(bot, message){

     Stage.findOne({ borough: 'li' }, function(err, stage) {
        var attachment = {
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":stage.title,
                "image_url":"https://petersfancybrownhats.com/company_image.png",
                "subtitle":"Price: " + stage.price + " "  + stage.subtitle,
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

  });


  // user says anything else
  controller.hears('(.*)', 'message_received', function (bot, message) {
    bot.reply(message, 'you said ' + message.match[1])
  })
}
