import ENV from 'timeuse/config/environment';

export default function () {
  this.namespace = 'rest/v1';
  this.urlPrefix = ENV.supabaseUrl;

  this.get('/timers?select=*', (schema) => {
    return schema.timers.all();
  });
  this.get('/timers', (schema) => schema.timers.all());

  this.get('/projects', (schema) => schema.projects.all());

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */
}
