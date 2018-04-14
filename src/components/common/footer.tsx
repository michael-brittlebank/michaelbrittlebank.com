import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithubAlt'
import * as faStackOverflow from '@fortawesome/fontawesome-free-brands/faStackOverflow'
import { Link } from 'react-router-dom'
import '../../sass/components/common/footer.css'

export default class Footer extends React.Component {

    render() {
        return (
            <footer className="grid-container row">
                <div className="col-sm-12 text-right">
                    <h4 id="footer-social-title">Find Me:</h4>
                    <Link to="https://www.linkedin.com/in/mikestumpf" target="_blank">
                        <FontAwesomeIcon icon={faLinkedIn} className="fa"/>
                    </Link>
                    <Link to="https://github.com/mike-stumpf" target="_blank">
                        <FontAwesomeIcon icon={faGithub} className="fa"/>
                    </Link>
                    <Link to="http://stackexchange.com/users/1282257/mike-stumpf?tab=accounts" target="_blank">
                        <FontAwesomeIcon icon={faStackOverflow} className="fa"/>
                    </Link>
                </div>
            </footer>
        );
    }
}
