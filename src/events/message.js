const _ = require('underscore');

const web = require('../webClient');

const message = ({ bot_id, channel, text }) => {

  if(_.isEqual(bot_id, 'BDX72S2JZ')) {
    console.log('IGNORE My Bot Message');
    return
  }

  console.log('MESSAGE Event', args);

  if (_.isEqual(text, 'echo')) {
    web.chat.postMessage({ channel, text }).catch(console.error);
  }
};

  module.exports = message;