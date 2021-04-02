import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service supabase;
  @service currentTimer;

  beforeModel() {
    if (!this.supabase.isAuthenticated) {
      this.transitionTo('sign-in');
    }
  }

  afterModel() {
    this.currentTimer.setup();
  }
}
