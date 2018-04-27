import * as React from 'react';
import '../../sass/components/sections/resume.css'
import * as Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin'
import * as faFile from '@fortawesome/fontawesome-free-solid/faFileAlt'
import { Link } from 'react-router-dom'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithubAlt'
import * as faStackOverflow from '@fortawesome/fontawesome-free-brands/faStackOverflow'

export default class Resume extends React.Component {
    render() {
        return (
            <div id="resume-container" className="grid-container row">
                <div className="col-sm-12">
                    <h1 id="resume-title" className="page-title">Resume</h1>
                </div>
                <section id="resume-body" className="col-sm-12 row">
                    <Fade>
                        <section className="col-sm-12">
                            <h2>Developer</h2>
                            <p>
                                DRY programmer with <strong>{this._getYearsOfExperience()} years</strong> of professional web development experience building bespoke websites and RESTful APIs using JavaScript, PHP, CSS, and HTML.
                            </p>
                            <p>
                                Equally comfortable in the front-end or the back-end and has a wide range of experience with different languages and frameworks. Familiar with working on several projects simultaneously and switching between different technology stacks on a regular basis.
                            </p>
                            <p>
                                Respected leader and experienced communicator who is able to plan for both long and short-term deadlines while continuously managing internal and external expectations and accommodating unexpected events.
                            </p>
                            <p>
                                Personal projects include creating a <a href="https://github.com/mike-stumpf/hauptstimme.js" target="_blank">JavaScript library for music theory</a>, collaborating on a Bluetooth-synchronized metronome mobile app, and developing a <a href="https://github.com/mike-stumpf/wp-reading-list" target="_blank">reading list plugin for WordPress</a>.
                            </p>
                        </section>
                        <section className="col-sm-12 col-md-6">
                            <h2>Experience</h2>
                            <h3>Senior Web Developer</h3>
                            <h5>2017&ndash;Present &mdash; <a href="https://www.recommenderx.com/" target="_blank">RecommenderX. Dublin, Ireland</a></h5>
                            <h3>Lead Web Developer</h3>
                            <h5>2013&ndash;2017 &mdash; <a href="http://ollon.ellefsontech.com/" target="_blank">Ellefson Technology. Toronto, Canada</a></h5>
                            <h3>Project Manager & Web Developer</h3>
                            <h5>2012&ndash;2013 &mdash; <a href="https://www.utoronto.ca/" target="_blank">University of Toronto, Toronto, Canada</a></h5>
                            <h3>Database Engineer</h3>
                            <h5>2012 &mdash; <a href="http://www.purdue.edu/" target="_blank">Purdue University, West Lafayette, USA</a></h5>
                        </section>
                        <section className="col-sm-12 col-md-6">
                            <h2>Education</h2>
                            <h3>Higher Diploma in Science, Computing</h3>
                            <h5>2017 &mdash; <a href="http://www.itb.ie/" target="_blank">Institute of Technology-Blanchardstown. Dublin, Ireland</a></h5>
                            <h3>MA, Renaissance Literature 1500-1700</h3>
                            <h5>2013 &mdash; <a href="http://www.york.ac.uk/" target="_blank">University of York. York, England</a></h5>
                            <h3>BS, English Language & Literature</h3>
                            <h5>2011 &mdash; <a href="http://www.wisc.edu/" target="_blank">University of Wisconsin-Madison. Madison, USA</a></h5>
                            <div id="resume-social-icons">
                                <h3 id="resume-social-title">Find Me:</h3>
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
                        </section>
                    </Fade>
                </section>
                <section className="col-sm-12">
                    <a href="/assets/Mike_Stumpf_Resume_2018.pdf" className="button" target="_blank">
                        <span>Download Resume&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faFile} className="fa"/></span>
                    </a>
                </section>
            </div>
        )
    }

    private _getYearsOfExperience(): number {
        return (new Date()).getFullYear() - 2012;
    }
}