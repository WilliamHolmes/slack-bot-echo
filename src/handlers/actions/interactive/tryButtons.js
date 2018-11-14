const queryStrings = require('query-string');

const web = require('../../webClient');

const buttonsTest = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received interactiveMessage body', body);
    const payload = JSON.parse(body.payload);

    const {
        user: { id: userId },
        actions: [action],
        channel: { id: channel },
        message_ts: ts
    } = payload;

    web.chat.update({
        channel,
        ts,
        text: 'Try out these buttons',
        attachments: [{
            title: 'Feeback',
            text : `Thanks for the Feeback <@${userId}>\n${JSON.stringify(action)}`
        }]
    }).catch(console.error);
}

module.exports = buttonsTest;