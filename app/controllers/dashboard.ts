import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import CurrentTimerService from 'timeuse/services/current-timer';
import TimerModel from 'timeuse/models/timer';
import moment from 'moment';

import { ModelFrom } from 'timeuse/utils/type-utils';
import DashboardRoute from 'timeuse/routes/dashboard';

export default class extends Controller {
  declare model: ModelFrom<DashboardRoute>;

  @service('current-timer') declare timerService: CurrentTimerService;

  get currentTimer() {
    return this.timerService.currentTimer;
  }

  get currentDuration() {
    return this.timerService.currentDuration;
  }

  @action
  async startTimer() {
    await this.timerService.start();
  }

  @action
  async stopTimer() {
    const stoppedTimer = this.timerService.currentTimer;
    await this.timerService.stop();

    if (stoppedTimer && stoppedTimer.endTimestamp) {
      const dailyTimer = this.model.dailyTimers.findBy(
        'date',
        moment(stoppedTimer.endTimestamp).format('YYYY-MM-DD')
      );

      dailyTimer?._timers.pushObject(stoppedTimer);
    }
  }

  @action
  async saveTimer() {
    await this.timerService.save();
  }

  @action
  async deleteTimer(timer: TimerModel) {
    this.model.dailyTimers = this.model.dailyTimers.rejectBy('id', timer.id);
    await timer.destroyRecord();
  }
}
