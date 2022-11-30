const match = require('./match');
const notMatch = require('./notMatch');

module.exports = {
  rules: {
    match,
    'not-match': notMatch,
  },
};
