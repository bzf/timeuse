import Service, { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import DS from 'ember-data';
import moment from 'moment';
import TimerModel from 'timeuse/models/timer';

export default class CurrentTimerService extends Service {
  @service declare store: DS.Store;

  @tracked timestamp = new Date();
  @tracked currentTimer?: TimerModel;

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
    if (this.currentTimer) {
      this.currentTimer.start();
      await this.currentTimer.save();
    }
  }

  async stop() {
    if (this.currentTimer) {
      this.currentTimer.stop();
      await this.currentTimer.save();

      this.currentTimer = this.store.createRecord('timer');
    }
  }

  async save() {
    if (this.currentTimer && !this.currentTimer.isNew) {
      await this.currentTimer.save();
    }
  }

  get currentDuration(): number | undefined {
    if (this.currentTimer && this.currentTimer.startTimestamp) {
      return moment
        .duration(moment(this.timestamp).diff(this.currentTimer.startTimestamp))
        .as('seconds');
    } else {
      return undefined;
    }
  }
}

declare module '@ember/service' {
  interface Registry {
    ['current-timer']: CurrentTimerService;
  }
}
