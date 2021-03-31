import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class extends Component {
  @service store;

  @tracked currentTime = new Date();
  @tracked currentTimer = null;

  @dropTask
  *setupCurrentTimer() {
    const currentTimers = yield this.store.query('timer', {
      end_timestamp: 'is.null',
      start_timestamp: 'not.is.null',
    });

    this.currentTimer = currentTimers.firstObject;
  }

  @action
  async startTimer() {
    if (isEmpty(this.currentTimer)) {
      this.currentTimer = this.store.createRecord('timer');
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

  get timerText() {
    const totalDurationInSeconds = Math.round(
      (this.currentTime.getTime() -
        Date.parse(this.currentTimer.startTimestamp)) /
        1000
    );

    const hours = Math.floor(totalDurationInSeconds / 3600);
    const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
    const seconds = totalDurationInSeconds % 60;

    return [hours, minutes, seconds]
      .map((a) => String(a))
      .map((a) => a.padStart(2, '0'))
      .join(':');
  }
}
