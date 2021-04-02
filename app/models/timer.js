import Model, { attr } from '@ember-data/model';
import { isEmpty, isPresent } from '@ember/utils';
import moment from 'moment';

import formatDurationInSeconds from 'timeuse/utils/format-duration-in-seconds';

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
    return formatDurationInSeconds(this.durationInSeconds) || '';
  }

  get durationInSeconds() {
    if (isEmpty(this.startTimestamp) || isEmpty(this.endTimestamp)) {
      return null;
    }

    return moment
      .duration(moment(this.endTimestamp).diff(this.startTimestamp))
      .as('seconds');
  }
}
