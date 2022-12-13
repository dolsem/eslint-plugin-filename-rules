const { aliases } = require('./aliases');

const getRegex = (value, filename) => {
  if (value instanceof RegExp) return [value, value.toString()];

  if (typeof value === 'string') {
    const predefinedRegex = aliases[value];
    if (predefinedRegex) return [predefinedRegex, value];

    if (value[0] === '/') {
      const ix = value.lastIndexOf('/');
      if (ix > 0) {
        const regex = new RegExp(value.substring(1, ix), value.substring(ix + 1));
        return [regex, value];
      }
    }

    throw new Error(`Unrecognized option "${value}"`);
  }

  if (value.pattern) return getRegex(value.pattern, filename);

  const extension = filename.substr(filename.lastIndexOf('.'));
  const valueForExtension = value[extension];
  return valueForExtension ? getRegex(valueForExtension) : [];
};

exports.getRegex = getRegex;
