export class AnalyticsService {
  static event = ({
    action,
    params,
  }: {
    action: string;
    params?: Record<string, unknown>;
  }) => {
    window['gtag']('event', action, params);
  };
}
