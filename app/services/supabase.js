import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import ENV from 'timeuse/config/environment';

import { createClient } from '@supabase/supabase-js';
import { tracked } from '@glimmer/tracking';

export default class SupabaseService extends Service {
  client = null;

  @tracked currentUser = null;

  constructor() {
    super();

    this.client = createClient(ENV.supabaseUrl, ENV.supabaseKey);
    this.currentUser = this.client.auth.user();
  }

  async authenticate(email, password) {
    const { user } = await this.client.auth.signIn({
      email,
      password,
    });

    this.currentUser = user;
  }

  async invalidate() {
    await this.client.auth.signOut();
    this.currentUser = null;
  }

  get isAuthenticated() {
    return isPresent(this.currentUser);
  }
}
