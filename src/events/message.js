const web = require('../webClient');

const message = (...args) => {
  console.log('MESSAGE Event', args);
  const [{ user, channel, text, subtype, files = [] }] = args;

    if (!user || subtype) {
      return;
    }

    web.chat.postMessage({ channel, text }).then(slackResponse => {
        console.log('Message sent: ' + slackResponse.ts);
    }).catch(console.error);
  };

  module.exports = message;