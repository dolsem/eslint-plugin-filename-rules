import test from 'ava';
import { RuleTester } from 'eslint';

import * as notMatch from '../../lib/notMatch';

const tester = new RuleTester();
const testRule = (tests) => () => tester.run('not-match', notMatch, tests);
const code = '"hello world";';

test('single regex', testRule({
  invalid: [
    {
      code,
      filename: '/foo/bar/test.txt',
      options: [/^test(?:\..*)?$/],
      errors: [
        { message: "Filename 'test.txt' must not match /^test(?:\\..*)?$/.", column: 1, line: 1 },
      ],
    },
  ],
  valid: [
    {
      code,
      filename: '/foo/bar/test_.txt',
      options: [/^test(?:\..*)?$/],
    },
  ],
}));

test('includePath', testRule({
  invalid: [
    {
      code,
      filename: '/foo/bar/test.txt',
      options: [{
        pattern: /^.*bar.*$/,
        includePath: true,
      }],
      errors: [
        { message: "Filename '/foo/bar/test.txt' must not match /^.*bar.*$/.", column: 1, line: 1 },
      ],
    },
  ],
  valid: [
    {
      code,
      filename: '/foo/bar/test.txt',
      options: [{
        pattern: /^.*baz.*$/,
        includePath: true,
      }],
    },
  ],
}));

test('throws on unknown alias', (t) => t.throws(testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/module.js',
      options: ['bla'],
    },
  ],
  invalid: [],
}), 'Unrecognized option "bla"\nOccurred while linting /foo/bar/module.js:1'));

['camelcase', 'camelCase'].forEach((alias) => {
  test(`single alias - ${alias}`, testRule({
    invalid: [
      {
        code,
        filename: '/foo/bar/module.js',
        options: [alias],
        errors: [
          { message: `Filename 'module.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/anotherModule.js',
        options: [alias],
        errors: [
          { message: `Filename 'anotherModule.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/module.test.js',
        options: [alias],
        errors: [
          { message: `Filename 'module.test.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
    ],
    valid: [
      {
        code,
        filename: '/foo/bar/Module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/AnotherModule.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/another-module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/another_module.js',
        options: [alias],
      },
    ],
  }));
});

['pascalcase', 'PascalCase'].forEach((alias) => {
  test(`single alias - ${alias}`, testRule({
    invalid: [
      {
        code,
        filename: '/foo/bar/Url.js',
        options: [alias],
        errors: [
          { message: `Filename 'Url.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/AnotherModule.js',
        options: [alias],
        errors: [
          { message: `Filename 'AnotherModule.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/AnotherModule.test.js',
        options: [alias],
        errors: [
          { message: `Filename 'AnotherModule.test.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/ModuleNameWithACRONYM.js',
        options: [alias],
        errors: [
          { message: `Filename 'ModuleNameWithACRONYM.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
    ],
    valid: [
      {
        code,
        filename: '/foo/bar/URL.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/url.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/anotherModule.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/Another-Module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/Another_Module.js',
        options: [alias],
      },
    ],
  }));
});

['snakecase', 'snake_case'].forEach((alias) => {
  test(`single alias - ${alias}`, testRule({
    invalid: [
      {
        code,
        filename: '/foo/bar/module.js',
        options: [alias],
        errors: [
          { message: `Filename 'module.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/another_module.js',
        options: [alias],
        errors: [
          { message: `Filename 'another_module.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/another_module.test.js',
        options: [alias],
        errors: [
          { message: `Filename 'another_module.test.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
    ],
    valid: [
      {
        code,
        filename: '/foo/bar/Module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/AnotherModule.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/anotherModule.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/another-module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/Another_Module.js',
        options: [alias],
      },
    ],
  }));
});

['kebabcase', 'kebab-case'].forEach((alias) => {
  test(`single alias - ${alias}`, testRule({
    invalid: [
      {
        code,
        filename: '/foo/bar/module.js',
        options: [alias],
        errors: [
          { message: `Filename 'module.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/another-module.js',
        options: [alias],
        errors: [
          { message: `Filename 'another-module.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
      {
        code,
        filename: '/foo/bar/another-module.test.js',
        options: [alias],
        errors: [
          { message: `Filename 'another-module.test.js' must not match ${alias}.`, column: 1, line: 1 },
        ],
      },
    ],
    valid: [
      {
        code,
        filename: '/foo/bar/Module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/AnotherModule.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/anotherModule.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/Another-Module.js',
        options: [alias],
      },
      {
        code,
        filename: '/foo/bar/another_module.js',
        options: [alias],
      },
    ],
  }));
});

test('file extension mapping', testRule({
  invalid: [
    {
      code,
      filename: '/foo/bar/someModule.js',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      errors: [
        { message: "Filename 'someModule.js' must not match camelcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/some-module.ts',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      errors: [
        { message: "Filename 'some-module.ts' must not match /^([a-z]+-)*[a-z]+(?:\\..*)?$/.", column: 1, line: 1 },
      ],
    },
  ],
  valid: [
    {
      code,
      filename: '/foo/bar/some-module.js',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
    },
    {
      code,
      filename: '/foo/bar/someModule.ts',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
    },
    {
      code,
      filename: '/foo/bar/SkippedModule.jsx',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
    },
  ],
}));
