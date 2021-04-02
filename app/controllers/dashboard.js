import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class extends Controller {
  @service('current-timer') timerService;

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
    const stoppedTimer = await this.timerService.stop();

    const dailyTimer = this.model.findBy(
      'date',
      moment(stoppedTimer.endTimestamp).format('YYYY-MM-DD')
    );

    dailyTimer._timers.pushObject(stoppedTimer);
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
