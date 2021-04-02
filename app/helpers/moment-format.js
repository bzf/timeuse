import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function momentFormat([format, date]) {
  return moment(date).format(format);
});
