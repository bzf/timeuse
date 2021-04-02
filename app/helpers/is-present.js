import { helper } from '@ember/component/helper';
import { isPresent as isP } from '@ember/utils';

export default helper(function isPresent([value]) {
  return isP(value);
});
