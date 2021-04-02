import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Service from '@ember/service';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  module('when not signed in', async function (hooks) {
    hooks.beforeEach(function () {
      class SupabaseStub extends Service {
        get isAuthenticated() {
          return false;
        }
      }

      this.owner.register('service:supabase', SupabaseStub);
    });

    test('visiting / redirects to /sign-in', async function (assert) {
      await visit('/');

      assert.equal(currentURL(), '/sign-in');
    });
  });

  module('when signed in', async function (hooks) {
    hooks.beforeEach(function () {
      class SupabaseStub extends Service {
        get currentSession() {
          return {};
        }

        get isAuthenticated() {
          return true;
        }
      }

      class StoreStub extends Service {
        query() {
          return [];
        }

        findAll() {
          return [];
        }
      }

      this.owner.register('service:supabase', SupabaseStub);
      this.owner.register('service:store', StoreStub);
    });

    test('visiting / redirects to /dashboard', async function (assert) {
      await visit('/');

      assert.equal(currentURL(), '/dashboard');
    });
  });
});
