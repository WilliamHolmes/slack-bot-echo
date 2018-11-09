const queryStrings = require('query-string');

// const web = require('../../webClient');

const { dialogSuggestions } = require('./options')

const options = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    console.log('Received ACTIONS CALLBACK', body);
    const payload = JSON.parse(body.payload);
    const { type } = payload;
    switch(type) {
        case 'dialog_suggestion': {
            return dialogSuggestions(req, res);
        }
        default:
    }
};

module.exports = options;