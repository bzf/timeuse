import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Model | timer', function (hooks) {
  setupTest(hooks);

  test('durationText works', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('timer', {
      startTimestamp: null,
      endTimestamp: null,
    });

    assert.equal(model.durationText, '');

    model.startTimestamp = moment('2021-01-01 00:00:00');
    assert.equal(model.durationText, '');

    model.endTimestamp = moment('2021-01-01 01:32:01');
    assert.equal(model.durationText, '1:32:01');

    model.endTimestamp = moment('2021-01-01 11:02:01');
    assert.equal(model.durationText, '11:02:01');
  });
});
