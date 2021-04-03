import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {
  @service session;
  @service currentTimer;

  @action
  async signOut() {
    await this.session.invalidate();
  }
}
