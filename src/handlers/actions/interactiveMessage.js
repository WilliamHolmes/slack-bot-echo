const _ = require('underscore');
const queryStrings = require('query-string');

const web = require('../../webClient');

const interactiveMessage = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received interactiveMessage body', body);
    const payload = JSON.parse(body.payload);

    const {
        user: { id: userId },
        callback_id ,
        actions: [action],
        channel: { id: channel },
        message_ts: ts
    } = payload;

    switch(callback_id) {
        case 'buttons_1234': {
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
        case 'snooze_selection': {
            if (_.isEqual(action.name, 'snooze_until')) {
                const { selected_options: [{ value }] } = action
                web.chat.update({
                    channel,
                    ts,
                    // text: 'Would you like to play a game?',
                    attachments: [{
                        title: 'Notifications',
                        text : `Muted until: *${value}*`
                    }]
                }).catch(console.error);
            }
        }
        default: {
            res.send();
        }
    }
}

module.exports = interactiveMessage;