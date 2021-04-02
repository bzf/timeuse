import formatDurationInSeconds from 'timeuse/utils/format-duration-in-seconds';
import { module, test } from 'qunit';

module('Unit | Utility | format-duration-in-seconds', function () {
  test('it works', function (assert) {
    assert.equal(formatDurationInSeconds(null), null);
    assert.equal(formatDurationInSeconds(0), '0:00:00');
    assert.equal(formatDurationInSeconds(1), '0:00:01');
    assert.equal(formatDurationInSeconds(61), '0:01:01');
    assert.equal(formatDurationInSeconds(123), '0:02:03');
    assert.equal(formatDurationInSeconds(3661), '1:01:01');
    assert.equal(formatDurationInSeconds(3600 * 11), '11:00:00');
  });
});
