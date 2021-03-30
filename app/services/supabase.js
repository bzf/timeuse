import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import ENV from 'timeuse/config/environment';

import { createClient } from '@supabase/supabase-js';
import { tracked } from '@glimmer/tracking';

export default class SupabaseService extends Service {
  client = null;

  @tracked currentUser = null;
  @tracked currentSession = null;

  constructor() {
    super();

    this.client = createClient(ENV.supabaseUrl, ENV.supabaseKey);
    this.currentUser = this.client.auth.user();
    this.currentSession = this.client.auth.session();
  }

  async authenticate(email, password) {
    const response = await this.client.auth.signIn({
      email,
      password,
    });

    this.currentUser = response.user;
    this.currentSession = response.session;

    return response;
  }

  async invalidate() {
    await this.client.auth.signOut();
    this.currentUser = null;
    this.currentSession = null;
  }

  get isAuthenticated() {
    return isPresent(this.currentUser);
  }
}
