import { memoize } from 'lodash';

export class ConfigService {
  static isDevEnvironment = memoize(
    () => process.env['NX_ENVIRONMENT']?.toLowerCase() === 'development',
  );
}
