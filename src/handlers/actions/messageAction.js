const queryStrings = require('query-string');

const web = require('../../webClient');

const messageAction = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    const payload = JSON.parse(body.payload);
    const { calback_id } = payload;

    switch(calback_id) {
      case 'echo_message': {
        const { message: { text } } = payload;
        console.log('TCL: echoMessage -> text', text);
        res.send({ text });
      }
      default:
    }

  };

  module.exports = messageAction;