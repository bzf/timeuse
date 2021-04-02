import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Component {
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
    await this.timerService.stop();
  }

  @action
  async saveTimer() {
    await this.timerService.save();
  }
}
