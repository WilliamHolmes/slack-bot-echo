const grabity = require("grabity");
const _ = require('underscore');
const Q = require('q');

const web = require('../webClient');

const message = (...args) => {
  console.log('LINK Event', args);
  const [{ channel, message_ts: ts, links = [] }] = args;
  const promises = _.map(links, async ({ url }) => {
    const meta = await grabity.grabIt(url);
    return{ ...meta, url };
  });
  return Q.all(promises).then(data => {
    _.each(data, site => {
      console.log('TCL: message -> site', site);
      const { title, description, image, url } = site;
      const unfurls = {
        [url]: {
          title,
          title_link: image,
          image_url: image,
          fields: [{
            title: 'Description',
            value: description
          }]
        }
      }
      web.chat.unfurl({ channel, ts, unfurls }).then(slackResponse => {
        console.log(`Message sent: ${slackResponse.ts}`);
      }).catch(console.error);
    });
  });
};

module.exports = message;