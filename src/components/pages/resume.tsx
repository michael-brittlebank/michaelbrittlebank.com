import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/resume.css'
import * as Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin'

export default class Resume extends React.Component {
    render() {
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | Resume</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 id="resume-title" className="page-title">Mike Stumpf</h1>
                </div>
                <div id="resume-body" className="col-sm-12 row">
                    <Fade>
                        <section className="col-sm-12">
                            <h2>Developer</h2>
                            <p>
                                DRY programmer with <strong>6 years</strong> of professional web development experience building bespoke websites and RESTful APIs using JavaScript, PHP, CSS, and HTML.
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
                            <h3 className="text-center">
                                <strong>
                                    <a href="https://www.linkedin.com/in/mikestumpf">
                                        View my full CV on Linked<FontAwesomeIcon icon={faLinkedIn} className="fa"/>
                                    </a>
                                </strong>
                            </h3>
                        </section>
                        <section className="col-sm-6">
                            <h2>Experience</h2>
                            <h3>Senior Web Developer</h3>
                            <h5>2017&ndash;Present &mdash; <a href="https://www.recommenderx.com/" target="_blank">RecommenderX. Dublin, Ireland</a></h5>
                            <h3>Lead Web Developer</h3>
                            <h5>2013&ndash;2017 &mdash; <a href="http://ollon.ellefsontech.com/" target="_blank">Ollon Technology. Toronto, Canada</a></h5>
                            <h3>Project Manager & Web Developer</h3>
                            <h5>2012&ndash;2013 &mdash; <a href="https://www.utoronto.ca/" target="_blank">University of Toronto, Toronto, Canada</a></h5>
                            <h3>Database Engineer</h3>
                            <h5>2012 &mdash; <a href="http://www.purdue.edu/" target="_blank">Purdue University, West Lafayette, USA</a></h5>
                        </section>
                        <section className="col-sm-6">
                            <h2>Education</h2>
                            <h3>Higher Diploma in Science, Computing</h3>
                            <h5>2017 &mdash; <a href="http://www.itb.ie/" target="_blank">Institute of Technology-Blanchardstown. Dublin, Ireland</a></h5>
                            <h3>MA, Renaissance Literature 1500-1700</h3>
                            <h5>2013 &mdash; <a href="http://www.york.ac.uk/" target="_blank">University of York. York, England</a></h5>
                            <h3>BS, English Language & Literature</h3>
                            <h5>2011 &mdash; <a href="http://www.wisc.edu/" target="_blank">University of Wisconsin-Madison. Madison, USA</a></h5>
                        </section>
                    </Fade>
                </div>
                <div className="col-sm-12">
                    <a href="/assets/Mike_Stumpf_Resume_2018.pdf" className="button" target="_blank">
                        <span>Download Resume</span>
                    </a>
                </div>
            </div>
        );
    }
}
