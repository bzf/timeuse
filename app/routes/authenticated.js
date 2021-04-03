import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service session;
  @service currentTimer;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'sign-in');
  }

  afterModel() {
    this.currentTimer.setup();
  }
}
