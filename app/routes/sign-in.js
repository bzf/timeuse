import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service supabase;

  beforeModel() {
    if (this.supabase.isAuthenticated) {
      this.transitionTo('dashboard');
    }
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.email = '';
      controller.password = '';
    }
  }
}
