import Model, { AsyncBelongsTo, attr, belongsTo } from '@ember-data/model';
import { isEmpty, isPresent } from '@ember/utils';
import moment from 'moment';
import ProjectModel from 'timeuse/models/project';

export default class TimerModel extends Model {
  @attr title?: string;
  @attr('moment') declare startTimestamp: moment.Moment;
  @attr('moment') endTimestamp?: moment.Moment;

  @belongsTo('project') project?: AsyncBelongsTo<ProjectModel>;

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
