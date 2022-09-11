import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
} from '@fortawesome/free-brands-svg-icons';

export function SocialMedia() {
  return (
    <>
      <a
        href="https://www.linkedin.com/in/mikestumpf"
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="fa" />
      </a>
      <a href="https://github.com/mike-stumpf" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} className="fa" />
      </a>
      <a
        href="http://stackexchange.com/users/1282257/mike-stumpf?tab=accounts"
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={faStackOverflow} className="fa" />
      </a>
    </>
  );
}
