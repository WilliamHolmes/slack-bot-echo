const _ = require('underscore');

const web = require('../webClient');

const message = (...args) => {
  console.log('MESSAGE Event', args);
  const [{ bot_id, channel, text }] = args;

  if(_.isEqual(bot_id, 'BDX72S2JZ')) {
    console.log('IGNORE My Bot Message');
    return
  }

    web.chat.postMessage({ channel, text }).then(slackResponse => {
        console.log('Message sent: ' + slackResponse.ts);
    }).catch(console.error);
  };

  module.exports = message;