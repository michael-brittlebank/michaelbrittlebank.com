import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithubAlt'
import * as faStackOverflow from '@fortawesome/fontawesome-free-brands/faStackOverflow'
import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
    render() {
        return (
            <footer className="grid-container row">
                <div id="footer-social-container" className="col-sm-12">
                    <h4 id="footer-social-title">Find Me:</h4>
                    <Link to="https://www.linkedin.com/in/mikestumpf" target="_blank">
                        <FontAwesomeIcon icon={faLinkedIn} className="fa"/>
                    </Link>
                    <Link to="https://github.com/mike-stumpf" target="_blank">
                        <i className="fa fa-github-alt"/>
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
