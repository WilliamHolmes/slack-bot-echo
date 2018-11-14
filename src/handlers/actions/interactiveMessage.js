const _ = require('underscore');
const queryStrings = require('query-string');

const web = require('../../webClient');

const { snoozeSelection, tryButtons } = require('./interactive')

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
        case 'try_buttons': {
            tryButtons(req, res);
        }
        case 'snooze_selection': {
            snoozeSelection(req, res);
        }
        default: {
            res.send();
        }
    }
}

module.exports = interactiveMessage;