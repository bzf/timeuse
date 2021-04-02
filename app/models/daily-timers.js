export default class DailyTimers {
  date = null;
  timers = [];

  constructor(date, timers) {
    this.date = date;
    this.timers = timers;
  }

  get totalDuration() {
    return this.timers
      .mapBy('durationInSeconds')
      .reduce((acc, a) => acc + a, 0);
  }
}
