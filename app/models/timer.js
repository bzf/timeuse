import Model, { attr } from '@ember-data/model';
import { isEmpty, isPresent } from '@ember/utils';

export default class TimerModel extends Model {
  @attr('string') title;
  @attr('date') startTimestamp;
  @attr('date') endTimestamp;

  get isRunning() {
    return isPresent(this.startTimestamp) && isEmpty(this.endTimestamp);
  }

  start() {
    this.startTimestamp = new Date();
  }

  stop() {
    this.endTimestamp = new Date();
  }

  get durationText() {
    const totalDurationInSeconds = Math.round(
      Date.parse(this.endTimestamp) / 1000 -
        Date.parse(this.startTimestamp) / 1000
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
