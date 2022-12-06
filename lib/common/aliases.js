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

exports.aliases = aliases;
