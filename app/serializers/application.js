import Serializer from '@ember-data/serializer';
import { camelize, underscore } from '@ember/string';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';

export default class ApplicationSerializer extends Serializer {
  @service session;

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (requestType === 'findRecord') {
      return this.normalize(primaryModelClass, payload.firstObject);
    } else if (requestType === 'createRecord') {
      return this.normalize(primaryModelClass, payload.firstObject);
    } else {
      return payload.reduce(
        (documentHash, item) => {
          let { data, included } = this.normalize(primaryModelClass, item);
          documentHash.included.push(...included);
          documentHash.data.push(data);
          return documentHash;
        },
        { data: [], included: [] }
      );
    }
  }

  serialize(snapshot) {
    let json = {
      id: snapshot.id,
    };

    snapshot.eachAttribute((key) => {
      json[underscore(key)] = snapshot.attr(key);
    });

    snapshot.eachRelationship((key, relationship) => {
      if (relationship.kind === 'belongsTo') {
        json[`${key}_id`] = snapshot.belongsTo(key, { id: true });
      } else if (relationship.kind === 'hasMany') {
        json[key] = snapshot.hasMany(key, { ids: true });
      }
    });

    json.user_id = this.session.data.authenticated.user.id;

    if (isEmpty(json.id)) {
      delete json.id;
    } else {
      json.id += '';
    }

    return json;
  }

  normalize(modelClass, resourceHash) {
    const attributes = Object.keys(resourceHash).reduce((attrs, key) => {
      return { ...attrs, [camelize(key)]: resourceHash[key] };
    }, {});

    const relationships = Object.keys(resourceHash)
      .map((a) => a.match(/^([a-z]+)_id$/i))
      .reject(isEmpty)
      .map((a) => a[1])
      .reject((a) => isEmpty(resourceHash[`${a}_id`]))
      .reduce(
        (attrs, type) => ({
          ...attrs,
          [type]: {
            data: {
              id: resourceHash[`${type}_id`],
              type,
            },
          },
        }),
        {}
      );

    const data = {
      id: '' + resourceHash.id,
      type: modelClass.modelName,
      attributes,
      relationships,
    };

    return { data, included: [] };
  }
}
