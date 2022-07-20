import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin';
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithubAlt';
import * as faStackOverflow from '@fortawesome/fontawesome-free-brands/faStackOverflow';
import * as faFile from '@fortawesome/fontawesome-free-solid/faFileAlt';
import Spacer from '../components/spacer';
import AnalyticsButton from '../components/analytics-button';

export default function Resume() {
  return (
    <div id="resume-container">
      <div className="grid-container row">
        <div className="col-sm-12">
          <h1 id="resume-title" className="page-title">
            Resume
          </h1>
        </div>
        <section id="resume-body" className="col-sm-12 row">
          <section className="col-sm-12">
            <h2 className="section-header">Software Engineer</h2>
            <p>
              Respected leader skilled in guiding and growing remote/distributed
              cross-disciplinary teams. Thoroughly invested in professional
              development, both technical and business breadth and depth, while
              remaining a hands-on programmer.
            </p>
            <p>
              Effective communicator who is able to plan for and coordinate
              diverse deadlines while continuously managing expectations as well
              as unexpected events. Doggedly focused on delivering iterative,
              future-proof solutions which satisfy stakeholders across the
              organization.
            </p>
            <p>
              SOLID, DRY software engineer with a wide range of experience
              building bespoke websites, RESTful APIs, cross-platform mobile
              apps, and cloud DevOps solutions. Advocate for test-driven
              development (TDD) accustomed to working on a variety of projects,
              languages, and frameworks simultaneously and switching between
              them on a regular basis.
            </p>
          </section>
          <section className="col-sm-12 col-md-6">
            <h2 className="section-header">Experience</h2>
            <h3>Application Development Senior Engineer</h3>
            <h5>
              2020&ndash;Present &mdash;{' '}
              <a href="https://www.amfam.com/" target="_blank" rel="noreferrer">
                American Family Insurance. Madison, WI, USA
              </a>
            </h5>
            <h3>Senior Software Developer</h3>
            <h5>
              2019&ndash;2020 &mdash;{' '}
              <a
                href="https://www.farmandfleet.com/"
                target="_blank"
                rel="noreferrer">
                Blain Supply. Janesville, WI, USA
              </a>
            </h5>
            <h3>Senior Front-End Software Developer</h3>
            <h5>
              2018&ndash;2019 &mdash;{' '}
              <a
                href="https://www.propellerhealth.com/"
                target="_blank"
                rel="noreferrer">
                Propeller Health. Madison, WI, USA
              </a>
            </h5>
            <h3>Senior Web Developer</h3>
            <h5>
              2017&ndash;2018 &mdash;{' '}
              <a
                href="https://www.recommenderx.com/"
                target="_blank"
                rel="noreferrer">
                RecommenderX. Dublin, Ireland
              </a>
            </h5>
            <h3>Lead Web Developer</h3>
            <h5>
              2013&ndash;2017 &mdash;{' '}
              <a href="http://ollon.ca/" target="_blank" rel="noreferrer">
                Ellefson Technology. Toronto, Canada
              </a>
            </h5>
            <h3>Project Manager & Web Developer (Contract)</h3>
            <h5>
              2012&ndash;2013 &mdash;{' '}
              <a
                href="https://www.utoronto.ca/"
                target="_blank"
                rel="noreferrer">
                University of Toronto, Toronto, Canada
              </a>
            </h5>
            <h3>Database Engineer (Contract)</h3>
            <h5>
              2012 &mdash;{' '}
              <a href="http://www.purdue.edu/" target="_blank" rel="noreferrer">
                Purdue University, West Lafayette, USA
              </a>
            </h5>
          </section>
          <section className="col-sm-12 col-md-6">
            <h2 className="section-header">Education</h2>
            <h3>Higher Diploma in Science, Computing</h3>
            <h5>
              2017 &mdash;{' '}
              <a
                href="https://www.tudublin.ie/"
                target="_blank"
                rel="noreferrer">
                Technical University Dublin. Dublin, Ireland
              </a>
            </h5>
            <h3>MA, Renaissance Literature 1500-1700</h3>
            <h5>
              2013 &mdash;{' '}
              <a href="http://www.york.ac.uk/" target="_blank" rel="noreferrer">
                University of York. York, England
              </a>
            </h5>
            <h3>BS, English Language & Literature</h3>
            <h5>
              2011 &mdash;{' '}
              <a href="http://www.wisc.edu/" target="_blank" rel="noreferrer">
                University of Wisconsin-Madison. Madison, USA
              </a>
            </h5>
            <div id="resume-social-icons">
              <h3 id="resume-social-title">Find Me:</h3>
              <a
                href="https://www.linkedin.com/in/mikestumpf"
                target="_blank"
                name="LinkedIn"
                rel="noreferrer">
                <FontAwesomeIcon icon={faLinkedIn} className="fa" />
              </a>
              <a
                href="https://github.com/mike-stumpf"
                target="_blank"
                name="Github"
                rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} className="fa" />
              </a>
              <a
                href="http://stackexchange.com/users/1282257/mike-stumpf?tab=accounts"
                target="_blank"
                name="Stack Exchange"
                rel="noreferrer">
                <FontAwesomeIcon icon={faStackOverflow} className="fa" />
              </a>
            </div>
          </section>
        </section>
        <section className="col-sm-12">
          <AnalyticsButton
            href="/files/Mike_Stumpf_Resume_2022.pdf"
            action="resumeButtonClick"
            content={
              <>
                Download Resume&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faFile} className="fa" />
              </>
            }
          />
        </section>
      </div>
      <Spacer color="blue" />
    </div>
  );
}
