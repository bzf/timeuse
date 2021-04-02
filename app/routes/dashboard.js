import Route from '@ember/routing/route';

export default class extends Route {
  async model() {
    const timers = await this.store.findAll('timer');

    return timers
      .rejectBy('isRunning')
      .rejectBy('isNew')
      .sortBy('endTimestamp')
      .reverse();
  }
}
