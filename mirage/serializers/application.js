import { JSONAPISerializer } from 'ember-cli-mirage';
import { underscore } from '@ember/string';
import { isEmpty } from '@ember/utils';

export default JSONAPISerializer.extend({
  serialize({ models }) {
    return models.map(function (snapshot) {
      let json = {
        id: snapshot.id,
      };

      Object.keys(snapshot.attrs).map((key) => {
        json[underscore(key)] = snapshot[key];
      });

      json.user_id = 1;

      if (isEmpty(json.id)) {
        delete json.id;
      } else {
        json.id += '';
      }

      return json;
    });
  },
});
