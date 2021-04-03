import { action } from '@ember/object';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import SupabaseService from 'timeuse/services/supabase';
import SessionService from 'ember-simple-auth/services/base';

export default class extends Controller {
  @service declare supabase: SupabaseService;
  @service declare session: SessionService;

  @tracked email = '';
  @tracked password = '';

  @tracked errorMessage?: string;

  @action
  async signUp(event: CustomEvent) {
    event.preventDefault();
    this.errorMessage = undefined;

    try {
      await this.supabase.register(this.email, this.password);
      await this.session.authenticate(
        'authenticator:supabase',
        this.email,
        this.password
      );
      this.transitionToRoute('dashboard');
    } catch (e) {
      this.errorMessage = e.message;
    }
  }
}
