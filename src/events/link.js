const web = require('../webClient');

const message = (...args) => {
  console.log('LINK Event', args);
  const [{ user, channel, text, subtype, files = [] }, data] = args;
  const { team_id } = data;
  console.log(`Link received from user ${user} in team ${team_id} in channel ${channel}`);
};

module.exports = message;