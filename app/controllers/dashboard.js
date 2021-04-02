import Controller from '@ember/controller';

export default class extends Controller {
  get timers() {
    return this.model;
  }

  get totalDuration() {
    return this.timers
      .mapBy('durationInSeconds')
      .reduce((acc, a) => acc + a, 0);
  }
}
