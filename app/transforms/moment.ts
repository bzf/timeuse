import DS from 'ember-data';
import moment from 'moment';

export default class MomentTransform extends DS.Transform {
  deserialize(serialized: string) {
    return moment(serialized);
  }

  serialize(deserialized: moment.Moment) {
    return deserialized.utc().format();
  }
}

declare module 'ember-data/types/registries/transform' {
  export default interface TransformRegistry {
    moment: MomentTransform;
  }
}
