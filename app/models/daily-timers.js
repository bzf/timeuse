import { tracked } from '@glimmer/tracking';

export default class DailyTimers {
  date = null;
  @tracked _timers = [];

  constructor(date, timers) {
    this.date = date;
    this._timers = timers;
  }

  get timers() {
    return this._timers.sortBy('endTimestamp').rejectBy('isDeleted').reverse();
  }

  get totalDuration() {
    return this.timers
      .mapBy('durationInSeconds')
      .reduce((acc, a) => acc + a, 0);
  }
}
