export default class AnalyticsService {
  static event = ({ action, params }) => {
    window.gtag('event', action, params)
  }
}
