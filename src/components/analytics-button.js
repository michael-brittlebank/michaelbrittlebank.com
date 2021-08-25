import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub';
import AnalyticsService from '../services/analytics.service';

export default function AnalyticsButton(props) {
  const { content } = props;
  const onButtonClick = () => {
    const { href, action } = props;
    AnalyticsService.event({
      action,
    });
    window.open(href, '_blank');
  };
  return (
    <a
      onClick={onButtonClick}
      className="button"
      target="_blank"
      rel="noreferrer">
      {content || (
        <>
          View Code&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faGithub} className="fa" />
        </>
      )}
    </a>
  );
}
