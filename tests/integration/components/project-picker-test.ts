import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | project-picker', function (hooks) {
  setupRenderingTest(hooks);

  test('renders all the passed projects', async function (assert) {
    const store = this.owner.lookup('service:store');
    this.set('projects', [
      store.createRecord('project', { name: 'Work' }),
      store.createRecord('project', { name: 'Play' }),
    ]);

    await render(hbs`<ProjectPicker @projects={{this.projects}} />`);

    const projectNames = findAll('[data-test-project-item]').map((e) =>
      e.textContent?.trim()
    );
    assert.deepEqual(projectNames, this.get('projects').mapBy('name'));
  });
});
