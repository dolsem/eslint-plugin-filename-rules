import test from 'ava';
import { RuleTester } from 'eslint';

import * as match from '../../lib/match';

const tester = new RuleTester();
const testRule = (tests) => () => tester.run('match', match, tests);
const code = '"hello world";';

test('single regex', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/test.txt',
      options: [/^test(?:\..*)?$/],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/test_.txt',
      options: [/^test(?:\..*)?$/],
      errors: [
        { message: "Filename 'test_.txt' does not match /^test(?:\\..*)?$/.", column: 1, line: 1 },
      ],
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

test('single alias - camelcase', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/module.js',
      options: ['camelcase'],
    },
    {
      code,
      filename: '/foo/bar/anotherModule.js',
      options: ['camelcase'],
    },
    {
      code,
      filename: '/foo/bar/module.test.js',
      options: ['camelcase'],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/Module.js',
      options: ['camelcase'],
      errors: [
        { message: "Filename 'Module.js' does not match camelcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/AnotherModule.js',
      options: ['camelcase'],
      errors: [
        { message: "Filename 'AnotherModule.js' does not match camelcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/another-module.js',
      options: ['camelcase'],
      errors: [
        { message: "Filename 'another-module.js' does not match camelcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/another_module.js',
      options: ['camelcase'],
      errors: [
        { message: "Filename 'another_module.js' does not match camelcase.", column: 1, line: 1 },
      ],
    },
  ],
}));

test('single alias - pascalcase', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/Url.js',
      options: ['pascalcase'],
    },
    {
      code,
      filename: '/foo/bar/AnotherModule.js',
      options: ['pascalcase'],
    },
    {
      code,
      filename: '/foo/bar/AnotherModule.test.js',
      options: ['pascalcase'],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/URL.js',
      options: ['pascalcase'],
      errors: [
        { message: "Filename 'URL.js' does not match pascalcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/url.js',
      options: ['pascalcase'],
      errors: [
        { message: "Filename 'url.js' does not match pascalcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/anotherModule.js',
      options: ['pascalcase'],
      errors: [
        { message: "Filename 'anotherModule.js' does not match pascalcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/Another-Module.js',
      options: ['pascalcase'],
      errors: [
        { message: "Filename 'Another-Module.js' does not match pascalcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/Another_Module.js',
      options: ['pascalcase'],
      errors: [
        { message: "Filename 'Another_Module.js' does not match pascalcase.", column: 1, line: 1 },
      ],
    },
  ],
}));

test('single alias - snakecase', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/module.js',
      options: ['snakecase'],
    },
    {
      code,
      filename: '/foo/bar/another_module.js',
      options: ['snakecase'],
    },
    {
      code,
      filename: '/foo/bar/another_module.test.js',
      options: ['snakecase'],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/Module.js',
      options: ['snakecase'],
      errors: [
        { message: "Filename 'Module.js' does not match snakecase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/AnotherModule.js',
      options: ['snakecase'],
      errors: [
        { message: "Filename 'AnotherModule.js' does not match snakecase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/anotherModule.js',
      options: ['snakecase'],
      errors: [
        { message: "Filename 'anotherModule.js' does not match snakecase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/another-module.js',
      options: ['snakecase'],
      errors: [
        { message: "Filename 'another-module.js' does not match snakecase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/Another_Module.js',
      options: ['snakecase'],
      errors: [
        { message: "Filename 'Another_Module.js' does not match snakecase.", column: 1, line: 1 },
      ],
    },
  ],
}));

test('single alias - kebabcase', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/module.js',
      options: ['kebabcase'],
    },
    {
      code,
      filename: '/foo/bar/another-module.js',
      options: ['kebabcase'],
    },
    {
      code,
      filename: '/foo/bar/another-module.test.js',
      options: ['kebabcase'],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/Module.js',
      options: ['kebabcase'],
      errors: [
        { message: "Filename 'Module.js' does not match kebabcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/AnotherModule.js',
      options: ['kebabcase'],
      errors: [
        { message: "Filename 'AnotherModule.js' does not match kebabcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/anotherModule.js',
      options: ['kebabcase'],
      errors: [
        { message: "Filename 'anotherModule.js' does not match kebabcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/Another-Module.js',
      options: ['kebabcase'],
      errors: [
        { message: "Filename 'Another-Module.js' does not match kebabcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/another_module.js',
      options: ['kebabcase'],
      errors: [
        { message: "Filename 'another_module.js' does not match kebabcase.", column: 1, line: 1 },
      ],
    },
  ],
}));

test('file extension mapping', testRule({
  valid: [
    {
      code,
      filename: '/foo/bar/someModule.js',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
    },
    {
      code,
      filename: '/foo/bar/some-module.ts',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
    },
    {
      code,
      filename: '/foo/bar/SkippedModule.jsx',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
    },
  ],
  invalid: [
    {
      code,
      filename: '/foo/bar/some-module.js',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      errors: [
        { message: "Filename 'some-module.js' does not match camelcase.", column: 1, line: 1 },
      ],
    },
    {
      code,
      filename: '/foo/bar/someModule.ts',
      options: [{ '.js': 'camelcase', '.ts': /^([a-z]+-)*[a-z]+(?:\..*)?$/ }],
      errors: [
        { message: "Filename 'someModule.ts' does not match /^([a-z]+-)*[a-z]+(?:\\..*)?$/.", column: 1, line: 1 },
      ],
    },
  ],
}));
