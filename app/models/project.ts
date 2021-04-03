import Model, { attr } from '@ember-data/model';

export default class ProjectModel extends Model {
  @attr declare name: string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    project: ProjectModel;
  }
}
