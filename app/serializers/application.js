import Serializer from '@ember-data/serializer';
import { camelize, underscore } from '@ember/string';

export default class ApplicationSerializer extends Serializer {
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    if (requestType === 'findRecord') {
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
        json[key] = snapshot.belongsTo(key, { id: true });
      } else if (relationship.kind === 'hasMany') {
        json[key] = snapshot.hasMany(key, { ids: true });
      }
    });

    return json;
  }

  normalize(modelClass, resourceHash) {
    const data = {
      id: resourceHash.id,
      type: modelClass.modelName,
      attributes: Object.keys(resourceHash).reduce(
        (attrs, key) => ({ ...attrs, [camelize(key)]: resourceHash[key] }),
        {}
      ),
    };

    return { data: data, included: [] };
  }
}
