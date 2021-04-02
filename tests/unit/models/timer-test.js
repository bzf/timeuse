import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Model | timer', function (hooks) {
  setupTest(hooks);

  test('durationInSeconds works', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('timer', {
      startTimestamp: null,
      endTimestamp: null,
    });

    assert.equal(model.durationInSeconds, null);

    model.startTimestamp = moment('2021-01-01 00:00:00');
    assert.equal(model.durationInSeconds, null);

    model.endTimestamp = moment('2021-01-01 00:32:01');
    assert.equal(model.durationInSeconds, 32 * 60 + 1);

    model.endTimestamp = moment('2021-01-01 01:02:01');
    assert.equal(model.durationInSeconds, 3600 + 2 * 60 + 1);
  });
});
