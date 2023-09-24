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
        href="https://www.linkedin.com/in/michaelbrittlebank"
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="fa" />
      </a>
      <a href="https://github.com/michael-brittlebank" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} className="fa" />
      </a>
      <a
        href="http://stackexchange.com/users/1282257/michael-brittlebank?tab=accounts"
        target="_blank"
        rel="noreferrer">
        <FontAwesomeIcon icon={faStackOverflow} className="fa" />
      </a>
    </>
  );
}
