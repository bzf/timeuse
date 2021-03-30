import { inject as service } from '@ember/service';
import ENV from 'timeuse/config/environment';
import RESTAdapter from '@ember-data/adapter/rest';

export default class ApplicationAdapter extends RESTAdapter {
  @service supabase;

  namespace = 'rest/v1';
  host = ENV.supabaseUrl;

  urlForFindAll(modelName) {
    let baseUrl = this.buildURL(modelName);
    return `${baseUrl}?select=*`;
  }

  urlForFindRecord(id, modelName) {
    return `${this.urlForFindAll(modelName)}?select=*&id=eq.${id}`;
  }

  urlForUpdateRecord(id, modelName) {
    return `${this.buildURL(modelName)}?id=eq.${id}`;
  }

  urlForDeleteRecord(id, modelName) {
    return `${this.buildURL(modelName)}?id=eq.${id}`;
  }

  get headers() {
    return {
      apikey: ENV.supabaseKey,
      Authorization: `Bearer ${ENV.supabaseKey}`,
      'Content-Type': 'application/json',
      prefer: 'return=representation',
    };
  }
}
