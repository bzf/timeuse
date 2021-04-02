import Controller from '@ember/controller';
import { action } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';

import DailyTimers from 'timeuse/models/daily-timers';

export default class extends Controller {
  @service('current-timer') timerService;

  get currentTimer() {
    return this.timerService.currentTimer;
  }

  get currentDuration() {
    return this.timerService.currentDuration;
  }

  get timersGroupedByDate() {
    const { model } = this;

    const groupedTimers = model.reduce((acc, t) => {
      const dateKey = moment(t.startTimestamp).format('YYYY-MM-DD');

      acc[dateKey] ||= [];
      acc[dateKey].push(t);

      return acc;
    }, {});

    return Object.keys(groupedTimers).map(
      (key) => new DailyTimers(key, groupedTimers[key])
    );
  }

  @action
  async startTimer() {
    await this.timerService.start();
  }

  @action
  async stopTimer() {
    const stoppedTimer = await this.timerService.stop();
    this.model.pushObject(stoppedTimer);
  }

  @action
  async saveTimer() {
    await this.timerService.save();
  }

  @action
  async deleteTimer(timer) {
    this.model = this.model.rejectBy('id', timer.id);
    await timer.destroyRecord();
  }
}
