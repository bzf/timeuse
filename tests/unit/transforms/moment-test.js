import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import moment from 'moment';

module('Unit | Transform | moment', function (hooks) {
  setupTest(hooks);

  test('deserializes', function (assert) {
    const transform = this.owner.lookup('transform:moment');

    const result = transform.deserialize('2021-03-31T19:38:42.767+00:00');

    assert.equal(result.valueOf(), 1617219522767);
  });

  test('serializes', function (assert) {
    const transform = this.owner.lookup('transform:moment');
    const date = moment(1617219522767);

    const result = transform.serialize(date);

    assert.equal(result, '2021-03-31T19:38:42Z');
  });
});
