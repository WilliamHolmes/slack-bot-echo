const queryStrings = require('query-string');

const web = require('../webClient');

const interactiveMessage = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received ACTIONS CALLBACK', body);
    const payload = JSON.parse(body.payload);
    const { message_ts: ts } = payload;

    const content = {
      "text": "Now back in stock!:tada:",
      "attachments": [
          {
              "title": "The Further Adventures of Slackbot",
              "fields": [
                  {
                      "title": "Volume",
                      "value": "1",
                      "short": true
                  },
                  {
                      "title": "Issue",
                      "value": "3",
                      "short": true
                  }
              ],
              "author_name": "Stanford S. Strickland",
              "author_icon": "http://a.slack-edge.com/7f18https://a.slack-edge.com/bfaba/img/api/homepage_custom_integrations-2x.png",
              "image_url": "http://i.imgur.com/OJkaVOI.jpg?1"
          },
          {
              "title": "Synopsis",
              "text": "After @episod pushed exciting changes to a devious new branch back in Issue 1, Slackbot notifies @don about an unexpected deploy..."
          },
          {
            "title": "Feeback",
            "text" : "Thanks for the Feeback :smile:"
          }
        ]
      }
    web.chat.update({ channel, ts, ...content}).then(slackResponse => {
      console.log(`Message sent: ${slackResponse.ts}`);
    }).catch(console.error);
    return res.send();
}

module.exports = interactiveMessage;