import Service from '@ember/service';
import { isPresent } from '@ember/utils';
import ENV from 'timeuse/config/environment';

import {
  SupabaseClient,
  User,
  Session,
  createClient,
} from '@supabase/supabase-js';
import { tracked } from '@glimmer/tracking';

export default class SupabaseService extends Service {
  client: SupabaseClient;

  @tracked currentUser: User | null;
  @tracked currentSession: Session | null;

  constructor() {
    super();

    this.client = createClient(ENV.supabaseUrl, ENV.supabaseKey);
    this.currentUser = this.client.auth.user();
    this.currentSession = this.client.auth.session();
  }

  async authenticate(email: string, password: string) {
    const response = await this.client.auth.signIn({
      email,
      password,
    });

    this.currentUser = response.user;
    this.currentSession = response.session;

    return response;
  }

  async register(email: string, password: string) {
    const { session, user, error } = await this.client.auth.signUp({
      email,
      password,
    });

    if (user && session) {
      this.currentUser = user;
      this.currentSession = session;
    } else if (error) {
      throw new Error(error.message);
    }
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

declare module '@ember/service' {
  interface Registry {
    supabase: SupabaseService;
  }
}
