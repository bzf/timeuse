import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | is-present', function (hooks) {
  setupRenderingTest(hooks);

  test('works with a value', async function (assert) {
    this.set('value', '1234');

    await render(hbs`{{is-present value}}`);

    assert.equal(this.element.textContent.trim(), 'true');
  });

  test('works without a value', async function (assert) {
    this.set('value', '');

    await render(hbs`{{is-present value}}`);

    assert.equal(this.element.textContent.trim(), 'false');
  });
});
