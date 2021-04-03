import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, findAll, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | timer-entry', function (hooks) {
  setupRenderingTest(hooks);

  test('renders the title', async function (assert) {
    const timer = this.owner.lookup('service:store').createRecord('timer');
    this.set('timer', timer);

    await render(hbs`<TimerEntry @timer={{this.timer}} />`);

    assert.dom('[data-test-timer-title]').hasText('No description');

    this.set('timer.title', 'my new title');
    assert.dom('[data-test-timer-title]').hasText('my new title');
  });

  test('renders the project if any', async function (assert) {
    const project = this.owner
      .lookup('service:store')
      .createRecord('project', { name: 'my-name' });

    const timer = this.owner.lookup('service:store').createRecord('timer');
    this.set('timer', timer);

    await render(hbs`<TimerEntry @timer={{this.timer}} />`);

    const elements = findAll('[data-test-project-name]');
    assert.equal(elements.length, 0, 'No project shown');

    this.set('timer.project', project);
    assert.dom('[data-test-project-name]').hasText(project.name);
  });

  test('renders the duration', async function (assert) {
    const timer = this.owner.lookup('service:store').createRecord('timer', {
      startTimestamp: new Date(2021, 1, 1, 15, 0, 0),
      endTimestamp: new Date(2021, 1, 1, 15, 3, 2),
    });

    this.set('timer', timer);

    await render(hbs`<TimerEntry @timer={{this.timer}} />`);

    assert.dom('[data-test-duration]').hasText('0:03:02');
  });

  test('renders the start and end times', async function (assert) {
    const timer = this.owner.lookup('service:store').createRecord('timer', {
      startTimestamp: new Date(2021, 1, 1, 15, 0, 0),
      endTimestamp: new Date(2021, 1, 1, 15, 3, 2),
    });

    this.set('timer', timer);

    await render(hbs`<TimerEntry @timer={{this.timer}} />`);

    assert.dom('[data-test-timestamp]').hasText('15:00 - 15:03');
  });

  test('clicking the trash icon calls the @onDelete action', async function (assert) {
    assert.expect(1);

    this.set('externalAction', () => assert.ok(true));

    await render(hbs`<TimerEntry @onDelete={{this.externalAction}} />`);

    await click('[data-test-delete-button]');
  });
});
