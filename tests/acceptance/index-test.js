import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';
import { setupApplicationTest } from 'ember-qunit';

import Service from '@ember/service';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  module('when not signed in', async function () {
    test('visiting / redirects to /sign-in', async function (assert) {
      await invalidateSession();

      await visit('/');

      assert.equal(currentURL(), '/sign-in');
    });
  });

  module('when signed in', async function (hooks) {
    hooks.beforeEach(function () {
      class StoreStub extends Service {
        query() {
          return [];
        }

        findAll() {
          return [];
        }

        createRecord() {}
      }

      this.owner.register('service:store', StoreStub);
    });

    test('visiting / redirects to /dashboard', async function (assert) {
      await authenticateSession({});

      await visit('/');

      assert.equal(currentURL(), '/dashboard');
    });
  });
});
