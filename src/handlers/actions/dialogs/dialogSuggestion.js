const dialogSuggestion = (req, res) => {
    const body = queryStrings.parse(req.body.toString());
    const payload = JSON.parse(body.payload);
    const { callback_id } = payload;

    console.log('dialogSuggestion -> callback_id', callback_id);

    switch(callback_id) {
      default: {
        res.send();
      }
    }
  };

  module.exports = dialogSuggestion;