const dialogSuggestions = (req, res) => {
  return res.send({
    option_groups: [{
      label: "A",
      options: [{
        label: "Accountant",
        value: "accountant"
      }]
    }, {
      label: "B",
      options: [{
        label: "Barista",
        value: "barista"
      }]
    }]
  });
};

module.exports = dialogSuggestions;