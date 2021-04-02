import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import moment from 'moment';

export default class extends Component {
  @service store;

  @tracked title = '';
  @tracked currentTime = new Date();
  @tracked currentTimer = null;

  @dropTask
  *setupCurrentTimer() {
    const currentTimers = yield this.store.query('timer', {
      end_timestamp: 'is.null',
      start_timestamp: 'not.is.null',
    });

    this.currentTimer = currentTimers.firstObject;

    if (isEmpty(this.currentTimer)) {
      this.currentTimer = this.store.createRecord('timer');
    }
  }

  @action
  async startTimer() {
    if (this.currentTimer.isRunning) {
      return;
    }

    this.currentTimer.start();
    await this.currentTimer.save();
  }

  @action
  async stopTimer() {
    this.currentTimer.stop();
    await this.currentTimer.save();

    this.currentTimer = this.store.createRecord('timer');
  }

  @action
  async saveTimer() {
    if (this.currentTimer.isNew) {
      return;
    }

    await this.currentTimer.save();
  }

  @action
  setupTimer() {
    setInterval(() => (this.currentTime = new Date()), 500);
  }

  get currentDuration() {
    return moment
      .duration(moment(this.currentTime).diff(this.currentTimer.startTimestamp))
      .as('seconds');
  }
}
