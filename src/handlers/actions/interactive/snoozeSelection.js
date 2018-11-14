const queryStrings = require('query-string');

const web = require('../../webClient');

const snoozeSelection = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received interactiveMessage body', body);
    const payload = JSON.parse(body.payload);

    const { action: { name } } = payload;

    switch(name) {
        case 'snooze_until': {
            const { selected_options: [{ value }] } = action
            web.chat.update({
                channel,
                ts,
                text: 'Would you like to play a game?',
                attachments: [{
                    title: 'Notifications',
                    text : `Muted until: *${value}*`
                }]
            }).catch(console.error);
        }
        case 'snooze_update': {
            web.chat.postMessage({
                channel,
                response_type: "in_channel",
                attachments: [{
                    text: "Snooze *Notifications* for how long?",
                    color: "#3AA3E3",
                    attachment_type: "default",
                    callback_id: "snooze_selection",
                    actions: [{
                        name: "snooze_until",
                        text: "Snooze until...",
                        type: "select",
                        options: [{
                            text: "Tomorrow",
                            value: "Tomorrow"
                        }, {
                            text: "Next Week",
                            value: "Next Week"
                        }, {
                            text: "Next Month",
                            value: "Next Month"
                        }]
                    }]
                }]
            });
        }
        default:
    }
}

module.exports = snoozeSelection;