/* eslint-disable brace-style */
/* eslint-disable camelcase */

module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, 'Welcome, friend')
  })

  // user said hello
  controller.hears(['hello'], 'message_received', function (bot, message) {
    bot.reply(message, 'You know, personally, I could never say this to anyone but you.' + message.user + 'Go eat an egg.');
  })

  controller.hears(['chamber'], 'message_received', function(bot, message) {

    var attachment = {
        'type':'template',
        'payload':{
            'template_type':'generic',
            'elements':[
                {
                    'title':'Chocolate Cookie',
                    'image_url':'http://cookies.com/cookie.png',
                    'subtitle':'A delicious chocolate cookie',
                    'buttons':[
                        {
                        'type':'postback',
                        'title':'Eat Cookie',
                        'payload':'chocolate'
                        }
                    ]
                },
            ]
        }
    };

    bot.reply(message, {
        attachment: attachment,
    });

  });

  controller.on('facebook_postback', function(bot, message) {

    if (message.payload == 'chocolate') {
        bot.reply(message, 'You ate the chocolate cookie!')
    }

  });


  // user says anything else
  controller.hears('(.*)', 'message_received', function (bot, message) {
    bot.reply(message, 'you said ' + message.match[1])
  })
}
