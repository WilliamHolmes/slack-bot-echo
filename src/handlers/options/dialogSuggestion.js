const _ = require('underscore');
const queryStrings = require('query-string');

const dialogSuggestions = (req, res) => {
  const body = queryStrings.parse(req.body.toString());
  console.log('Received ACTIONS CALLBACK', body);
  const payload = JSON.parse(body.payload);
  const { callback_id } = payload;

  switch(callback_id) {
    case 'dialog_my_job': {
      const { name, value = '' } = payload;
      if (_.isEqual(name, 'role')) {
        console.log(`You Could Filter on ${value}`);
        const option_groups = _.filter([{
            label: 'A',
            options: [{
              label: 'Accountant',
              value: 'accountant'
            }]
          }, {
            label: 'B',
            options: [{
              label: 'Barista',
              value: 'barista'
            }]
          }], ({ label }) => (label.toLocaleLowerCase() === value.toLocaleLowerCase()));
        return res.send({ option_groups  });
      }
    }
    default: {
      res.send();
    }
  }
};

module.exports = dialogSuggestions;