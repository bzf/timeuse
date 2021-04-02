import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import moment from 'moment';

export default class extends Service {
  @service store;

  @tracked timestamp = new Date();
  @tracked currentTimer = null;

  constructor() {
    super(...arguments);

    setInterval(() => (this.timestamp = new Date()), 500);
  }

  async setup() {
    const currentTimers = await this.store.query('timer', {
      end_timestamp: 'is.null',
      start_timestamp: 'not.is.null',
    });

    this.currentTimer = currentTimers.firstObject;

    if (isEmpty(this.currentTimer)) {
      this.currentTimer = this.store.createRecord('timer');
    }
  }

  async start() {
    if (this.currentTimer.isRunning) {
      return;
    }

    this.currentTimer.start();
    await this.currentTimer.save();
  }

  async stop() {
    this.currentTimer.stop();
    await this.currentTimer.save();

    const stoppedTimer = this.currentTimer;

    this.currentTimer = this.store.createRecord('timer');

    return stoppedTimer;
  }

  async save() {
    if (this.currentTimer.isNew) {
      return;
    }

    await this.currentTimer.save();
  }

  get currentDuration() {
    return moment
      .duration(moment(this.timestamp).diff(this.currentTimer.startTimestamp))
      .as('seconds');
  }
}
