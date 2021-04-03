import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {
  @service supabase;
  @service currentTimer;

  @action
  async signOut() {
    await this.supabase.invalidate();
    this.store.unloadAll();
    this.transitionToRoute('sign-in');
  }
}
