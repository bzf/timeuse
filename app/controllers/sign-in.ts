import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import SessionService from 'ember-simple-auth/services/base';

export default class extends Controller {
  @service declare session: SessionService;

  @tracked email = '';
  @tracked password = '';
  @tracked errorMessage?: string;

  @action
  async signIn(event: CustomEvent) {
    event.preventDefault();
    this.errorMessage = undefined;

    try {
      await this.session.authenticate(
        'authenticator:supabase',
        this.email,
        this.password
      );
    } catch (e) {
      this.errorMessage = e.message;
    }
  }
}
