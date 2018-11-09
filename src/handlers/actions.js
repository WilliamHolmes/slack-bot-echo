const queryStrings = require('query-string');

const web = require('../webClient');

const { interactiveMessage } = require('./actions');

const actions = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received ACTIONS CALLBACK', body);
    const payload = JSON.parse(body.payload);
    const { type, user: { id: user }, team: { id: team }, channel: { id: channel } } = payload;

    switch(type) {
        case 'interactive_message': {
            return interactiveMessage(req, res);
        }
        default:
    }

    const { submission: { email } } = payload;

    if (!email.includes('@')) {
      return res.send({
        errors: [{
          name: 'email',
          error: "Invalid Email Address - @"
        }]
      });
    }

    const text = 'Thanks for the dialog submission';

    web.chat.postEphemeral({ user, channel, text }).then(slackResponse => {
        console.log('Message sent: ' + slackResponse.ts);
    }).catch(console.error);

    res.send();
  };

  module.exports = actions;