import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatTimestamp([timestamp]) {
  return moment(timestamp).format('HH:mm');
});
