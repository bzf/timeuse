import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | or', function (hooks) {
  setupRenderingTest(hooks);

  test('works', async function (assert) {
    this.set('inputValue', null);

    await render(hbs`{{or inputValue '321'}}`);

    assert.equal(this.element.textContent?.trim(), '321');

    this.set('inputValue', '1234');

    assert.equal(this.element.textContent?.trim(), '1234');
  });
});
