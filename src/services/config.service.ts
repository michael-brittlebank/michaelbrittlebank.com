export class ConfigService {
  static isDevEnvironment =
    () => process.env['NX_ENVIRONMENT']?.toLowerCase() === 'development';
}
