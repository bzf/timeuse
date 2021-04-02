import { tracked } from '@glimmer/tracking';
import TimerModel from 'timeuse/models/timer';

export default class DailyTimers {
  date: string;
  @tracked _timers: Array<TimerModel> = [];

  constructor(date: string, timers: Array<TimerModel>) {
    this.date = date;
    this._timers = timers;
  }

  get timers(): Array<TimerModel> {
    return this._timers.sortBy('endTimestamp').rejectBy('isDeleted').reverse();
  }

  get totalDuration(): number {
    return this.timers
      .mapBy('durationInSeconds')
      .reduce((acc, a) => acc + a, 0);
  }
}
