import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import ENV from 'timeuse/config/environment';

export default class SupabaseAuthenticator extends BaseAuthenticator {
  async authenticate(email: string, password: string) {
    const { supabaseUrl, supabaseKey } = ENV;

    return await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => response.json());
  }

  async restore(data: any) {
    return data;
  }
}
