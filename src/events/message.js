const web = require('../webClient');

const message = ({ user, channel, text, subtype, files = [] }, { team_id }) => {
    console.log(`Received a message event: user ${user} in team ${team_id} in channel ${channel} says ${text} with files ${JSON.stringify(files, null, 2)}`);

    if (!user || subtype) {
      return;
    }

    web.chat.postMessage({ channel, text }).then(slackResponse => {
        console.log('Message sent: ' + slackResponse.ts);
    }).catch(console.error);
  };

  module.exports = message;