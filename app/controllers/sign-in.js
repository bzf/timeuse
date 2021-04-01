import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class extends Controller {
  @service supabase;

  @tracked email = '';
  @tracked password = '';

  @action
  async signIn(event) {
    event.preventDefault();

    await this.supabase.authenticate(this.email, this.password);
    this.transitionToRoute('authenticated.dashboard');
  }
}
