import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class extends Route {
  @service session;

  beforeModel() {
    this.session.prohibitAuthentication('dashboard');
  }

  resetController(controller, isExiting) {
    if (isExiting) {
      controller.email = '';
      controller.password = '';
    }
  }
}
