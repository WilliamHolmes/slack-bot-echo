const grabity = require("grabity");
const _ = require('underscore');

const web = require('../webClient');

const message = (...args) => {
  console.log('LINK Event', args);
  const [{ links = [] }] = args;
  console.log(`Links ${JSON.stringify(links)}`);
  const attachments = _.map(links, ({ url }) => {
    return (async () => {
      const data = await grabity.grabIt(url);
      console.log('TCL: message -> data', data);
    });
  })
};

module.exports = message;