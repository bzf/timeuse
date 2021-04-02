import Transform from '@ember-data/serializer/transform';
import moment from 'moment';

export default class MomentTransform extends Transform {
  deserialize(serialized) {
    return moment(serialized);
  }

  serialize(deserialized) {
    return deserialized.utc().format();
  }
}
