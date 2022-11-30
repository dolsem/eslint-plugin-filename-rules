const { aliases } = require('./aliases');

const getRegex = (value, filename) => {
  if (value instanceof RegExp) { return [value, value.toString()]; }
  if (typeof value === 'string') {
    const regex = aliases[value];
    if (!regex) { throw new Error(`Unrecognized option "${value}"`); }
    return [regex, value];
  }

  if (value.pattern) return getRegex(value.pattern, filename);

  const extension = filename.substr(filename.lastIndexOf('.'));
  const valueForExtension = value[extension];
  return valueForExtension ? getRegex(valueForExtension) : [];
};
exports.getRegex = getRegex;
