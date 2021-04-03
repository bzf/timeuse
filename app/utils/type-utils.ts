// https://github.com/typed-ember/ember-cli-typescript/blob/4e4b161d55aae9d3409f7b7ad9630473af87109b/docs/cookbook/working-with-route-models.md

import Route from '@ember/routing/route';

/**
  Get the resolved type of an item.

  - If the item is a promise, the result will be the resolved value type
  - If the item is not a promise, the result will just be the type of the item
 */
export type Resolved<P> = P extends Promise<infer T> ? T : P;

/** Get the resolved model value from a route. */
export type ModelFrom<R extends Route> = Resolved<ReturnType<R['model']>>;
