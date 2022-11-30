import test from 'ava';

import * as lib from '../../lib/index';
import match from '../../lib/match';
import notMatch from '../../lib/notMatch';

test('exports the match rule', (t) => {
  t.is(lib.rules.match, match);
});

test('exports the notMatch rule', (t) => {
  t.is(lib.rules['not-match'], notMatch);
});
