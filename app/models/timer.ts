import Model, { attr } from '@ember-data/model';
import { isEmpty, isPresent } from '@ember/utils';
import moment from 'moment';

export default class TimerModel extends Model {
  @attr title?: string;
  @attr('moment') declare startTimestamp: moment.Moment;
  @attr('moment') endTimestamp?: moment.Moment;

  get isRunning() {
    return isPresent(this.startTimestamp) && isEmpty(this.endTimestamp);
  }

  start() {
    this.startTimestamp = moment();
  }

  stop() {
    this.endTimestamp = moment();
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
