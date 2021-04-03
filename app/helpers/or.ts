import { helper } from '@ember/component/helper';
import { isPresent } from '@ember/utils';

export function or(params: Array<any>): any | undefined {
  for (const i of params) {
    if (isPresent(i)) {
      return i;
    }
  }
}

export default helper(or);
