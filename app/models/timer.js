import Model, { attr } from '@ember-data/model';
import { isEmpty, isPresent } from '@ember/utils';
import moment from 'moment';

export default class TimerModel extends Model {
  @attr('string') title;
  @attr('moment') startTimestamp;
  @attr('moment') endTimestamp;

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
    if (isEmpty(this.startTimestamp) || isEmpty(this.endTimestamp)) {
      return '';
    }

    const duration = moment.duration(
      moment(this.endTimestamp).diff(this.startTimestamp)
    );

    const parts = [
      String(duration.hours()),
      String(duration.minutes()).padStart(2, '0'),
      String(duration.seconds()).padStart(2, '0'),
    ];

    return parts.join(':');
  }
}
