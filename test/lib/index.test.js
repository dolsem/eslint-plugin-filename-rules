import test from 'ava';

import * as lib from '../../lib/index';
import match from '../../lib/match';

test('exports the match rule', (t) => {
  t.is(lib.rules.match, match);
});
