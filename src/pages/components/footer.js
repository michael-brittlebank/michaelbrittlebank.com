import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithubAlt'
import * as faStackOverflow from '@fortawesome/fontawesome-free-brands/faStackOverflow'

export default function Footer() {
 return (
   <footer className="grid-container row animated fadeInUp">
    <div className="col-sm-12 text-right">
     <h4 id="footer-social-title">Find Me:</h4>
     <a href="https://www.linkedin.com/in/mikestumpf" target="_blank">
      <FontAwesomeIcon icon={faLinkedIn} className="fa"/>
     </a>
     <a href="https://github.com/mike-stumpf" target="_blank">
      <FontAwesomeIcon icon={faGithub} className="fa"/>
     </a>
     <a href="http://stackexchange.com/users/1282257/mike-stumpf?tab=accounts" target="_blank">
      <FontAwesomeIcon icon={faStackOverflow} className="fa"/>
     </a>
    </div>
   </footer>
 );
}