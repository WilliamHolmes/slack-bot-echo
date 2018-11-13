const queryStrings = require('query-string');

const web = require('../../webClient');

const interactiveMessage = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received interactiveMessage', body);
    const payload = JSON.parse(body.payload);
    const { callback_id } = payload;

    switch(callback_id) {
        case 'buttons_1234': {
            const { actions: [action], channel: { id: channel }, message_ts: ts } = payload;
            web.chat.update({
                channel,
                ts,
                text: 'Try out these buttons',
                attachments: [{
                    title: 'Feeback',
                    text : `Thanks for the Feeback <@UDW87UF6U>\n${JSON.stringify(action)}`
                }]
            }).catch(console.error);
        }
        default: {
            res.send();
        }
    }

    return res.send();
}

module.exports = interactiveMessage;