import Service, { inject as service } from '@ember/service';
import ENV from 'timeuse/config/environment';
import SessionService from 'ember-simple-auth/services/base';

import { SupabaseClient, createClient } from '@supabase/supabase-js';

export default class SupabaseService extends Service {
  client: SupabaseClient;

  @service declare session: SessionService;

  constructor() {
    super(...arguments);

    this.client = createClient(ENV.supabaseUrl, ENV.supabaseKey);
  }

  async register(email: string, password: string) {
    const { session, user, error } = await this.client.auth.signUp({
      email,
      password,
    });

    if (user && session) {
      return;
    } else if (error) {
      throw new Error(error.message);
    }
  }
}

declare module '@ember/service' {
  interface Registry {
    supabase: SupabaseService;
  }
}
