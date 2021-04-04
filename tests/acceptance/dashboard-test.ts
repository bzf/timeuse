import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { TestContext } from 'ember-test-helpers';

interface Context extends TestContext {
  server: any;
}

module('Acceptance | dashboard', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(async function () {
    await authenticateSession();
  });

  test('visiting /dashboard', async function (this: Context, assert) {
    this.server.createList('timer', 3);

    await visit('/dashboard');

    assert.equal(currentURL(), '/dashboard');
    assert.dom('[data-test-timer-entry]').exists({ count: 3 });
  });
});
