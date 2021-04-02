import { helper } from '@ember/component/helper';
import formatDurationInSeconds from 'timeuse/utils/format-duration-in-seconds';

export default helper(function formatDuration([seconds]) {
  return formatDurationInSeconds(seconds);
});
