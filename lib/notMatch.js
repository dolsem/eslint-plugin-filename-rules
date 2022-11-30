const path = require('path');
const { getRegex } = require('./common/getRegex');

const meta = {
  type: 'layout',
  docs: {
    description: 'checks that filenames does not match a chosen pattern',
  },
  fixable: false,
  messages: {
    match: "Filename '{{name}}' must not match {{value}}.",
  },
};

module.exports = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filename = context.getFilename();
      const basename = path.basename(filename);
      const [regex, regexStr] = getRegex(context.options[0], basename);
      if (!regex) return;
      if (regex.test(basename)) {
        context.report({
          node,
          messageId: 'match',
          data: {
            name: basename,
            value: regexStr,
          },
        });
      }
    },
  }),
};
