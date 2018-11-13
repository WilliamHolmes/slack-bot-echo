const queryStrings = require('query-string');

const web = require('../../webClient');

const interactiveMessage = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received interactiveMessage', body);
    const payload = JSON.parse(body.payload);
    const { channel: { id: channel }, message_ts: ts } = payload;

    const content = {
        text: 'Try out these buttons',
        attachments: [{
            title: 'Feeback',
            text : 'Thanks for the Feeback <@UDW87UF6U>'
        }]
    }

    web.chat.update({ channel, ts, ...content}).catch(console.error);

    return res.send();
}

module.exports = interactiveMessage;