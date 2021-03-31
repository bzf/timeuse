import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked currentTime = new Date();
  @tracked startTime = new Date();

  @action
  setupTimer() {
    setInterval(() => (this.currentTime = new Date()), 500);
  }

  get timerText() {
    const totalDurationInSeconds = Math.round(
      (this.currentTime.getTime() - this.startTime.getTime()) / 1000
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
