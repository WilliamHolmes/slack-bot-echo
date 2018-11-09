const dialogSuggestions = () => {
    return res.send({
        "option_groups": [
        {
          "label": "C",
          "options": [
            {
              "label": "Maru",
              "value": "maru"
            },
            {
              "label": "Lil Bub",
              "value": "lilbub"
            },
            {
              "label": "Hamilton the Hipster Cat",
              "value": "hamilton"
            }
          ]
        },
        {
          "label": "D",
          "options": [
            {
              "label": "Boo the Pomeranian",
              "value": "boo"
            }
          ]
        }
      ]
    });
};

module.exports = dialogSuggestions;