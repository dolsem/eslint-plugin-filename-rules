const path = require('path');

const meta = {
  type: 'layout',
  docs: {
    description: 'checks that filenames match a chosen pattern',
  },
  fixable: false,
  messages: {
    noMatch: "Filename '{{name}}' does not match {{value}}.",
  },
};

const aliases = {
  pascalcase: /^[A-Z]([A-Z0-9]*[a-z]+)+[A-Z0-9]*(?:\..*)?$/,
  camelcase: /^[a-z]+((\d)|([A-Z0-9][a-z0-9]+))*([A-Z])?(?:\..*)?$/,
  snakecase: /^([a-z]+_)*[a-z]+(?:\..*)?$/,
  kebabcase: /^([a-z]+-)*[a-z]+(?:\..*)?$/,
};

aliases.PascalCase = aliases.pascalcase;
aliases.camelCase = aliases.camelcase;
aliases.snake_case = aliases.snakecase;
aliases['kebab-case'] = aliases.kebabcase;

const getRegex = (value, filename) => {
  if (value instanceof RegExp) return [value, value.toString()];

  if (typeof value === 'string') {
    const predefinedRegex = aliases[value];
    if (predefinedRegex) return [predefinedRegex, value];

    if (value[0] === '/') {
      const ix = value.lastIndexOf('/');
      if (ix > 0) {
        const regex = new RegExp(value.substring(1, ix - 1), value.substring(ix + 1));
        return [regex, value];
      }
    }

    throw new Error(`Unrecognized option "${value}"`);
  }

  const extension = filename.substr(filename.lastIndexOf('.'));
  const valueForExtension = value[extension];
  return valueForExtension ? getRegex(valueForExtension) : [];
};

module.exports = {
  meta,
  create: (context) => ({
    Program: (node) => {
      const filename = context.getFilename();
      const basename = path.basename(filename);
      const [regex, regexStr] = getRegex(context.options[0], basename);
      if (!regex) return;
      if (!regex.test(basename)) {
        context.report({
          node,
          messageId: 'noMatch',
          data: {
            name: basename,
            value: regexStr,
          },
        });
      }
    },
  }),
};
