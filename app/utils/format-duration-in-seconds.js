import { isEmpty } from '@ember/utils';
import moment from 'moment';

export default function formatDurationInSeconds(seconds) {
  if (isEmpty(seconds)) {
    return null;
  }

  const duration = moment.duration(seconds, 'seconds');

  const parts = [
    String(duration.hours()),
    String(duration.minutes()).padStart(2, '0'),
    String(duration.seconds()).padStart(2, '0'),
  ];

  return parts.join(':');
}
