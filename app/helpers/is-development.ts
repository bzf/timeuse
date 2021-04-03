import { helper } from '@ember/component/helper';
import config from 'timeuse/config/environment';

export function isDevelopment(): boolean {
  return config.environment === 'development';
}

export default helper(isDevelopment);
