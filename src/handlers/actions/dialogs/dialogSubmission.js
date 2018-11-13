
const isEmail = require('isemail');

const dialogSubmission = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    const payload = JSON.parse(body.payload);
    const { callback_id } = payload;

    console.log('TCL: dialogSubmission -> callback_id', callback_id);

    switch(callback_id) {
      case 'dialog_my_job': {
        const { channel: { id: channel }, user: { id: user }, submission: { email = '' }, submission } = payload;
        if (!isEmail.validate(email)) {
          return res.send({
            errors: [{
              name: 'email',
              error: "Invalid Email Address"
            }]
          });
        }
        web.chat.postEphemeral({ user, channel, text: JSON.stringify(submission) }).catch(console.error);
      }
      default:
        res.send();
    }
  };

  module.exports = dialogSubmission;