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
}
