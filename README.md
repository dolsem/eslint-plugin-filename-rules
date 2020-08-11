# eslint-plugin-filename-rules

Adds an ESLint rule to enforce filename conventions for linted files. Allows different options for different file extensions. Supports custom regular expressions.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coverage-image]][coverage-url]
[![License: MIT][license-image]][license-url]


## Installation

```bash
$ npm install -D eslint-plugin-filename-rules
```

Add it to your `.eslintrc.js`:

```js
module.exports = {
  plugins: [
    'filename-rules',
  ],
  rules: {
    'filename-rules/match': [2, 'camelcase'],
  },
};
```

## Plugin Options

The following built-in values are supported: `'pascalcase'`, `'camelcase'`, `'snakecase'`, `'kebabcase'`. You can also provide your own regex:

```js
...
'filename-rules/match': [2, /^([a-z]+-)*[a-z]+(?:\..*)?$/],
...
```

You can also specify different options for different file extensions. In this case the plugin will only check files with extensions you explicitly provided:

```js
...
'filename-rules/match': [2, { '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
...
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/eslint-plugin-filename-rules.svg?style=flat-square
[npm-url]: https://npmjs.org/package/eslint-plugin-filename-rules
[downloads-image]: https://img.shields.io/npm/dm/eslint-plugin-filename-rules.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/eslint-plugin-filename-rules
[travis-image]: https://img.shields.io/travis/dolsem/eslint-plugin-filename-rules.svg?style=flat-square
[travis-url]: https://travis-ci.org/dolsem/eslint-plugin-filename-rules
[coverage-image]: https://img.shields.io/coveralls/dolsem/eslint-plugin-filename-rules.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/dolsem/eslint-plugin-filename-rules?branch=master
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square
[license-url]: https://opensource.org/licenses/MIT
