import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { AnalyticsButton, SocialMedia, Spacer } from '../shared';

export function Resume() {
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
              Respected leader skilled in guiding remote/hybrid
              cross-disciplinary teams. Lifelong mentor and teacher committed to
              raising others up holistically. Thoroughly invested in a
              continuous learning mindset focusing on business and technology,
              breadth and depth.
            </p>
            <p>
              Effective communicator who is able to plan for and coordinate
              diverse deadlines while continuously managing expectations as well
              as unexpected events. Agile evangelist incorporating the best of
              Lean, SAFe, Six Sigma, and other frameworks to meet deliverables
              despite dependencies and roadblocks. Doggedly focused on
              delivering iterative, future-proof solutions which satisfy
              stakeholders across the organization.
            </p>
            <p>
              SOLID, DRY software engineer with a wide range of experience
              building bespoke websites, RESTful APIs, cross-platform mobile
              apps, and cloud DevOps solutions. Advocate for test-driven
              development (TDD) and accustomed to context switching between a
              variety of projects, languages, and frameworks.
            </p>
          </section>
          <section className="col-sm-12 col-md-6">
            <h2 className="section-header">Experience</h2>
            <h3>Technical Solutions Delivery Manager</h3>
            <h5>
              2020&ndash;Present &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                American Family Insurance. Madison, WI, USA
              </a>
            </h5>
            <h3>Senior Software Developer</h3>
            <h5>
              2019&ndash;2020 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                Blain Supply. Janesville, WI, USA
              </a>
            </h5>
            <h3>Senior Front-End Software Developer</h3>
            <h5>
              2018&ndash;2019 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                Propeller Health. Madison, WI, USA
              </a>
            </h5>
            <h3>Senior Web Developer</h3>
            <h5>
              2017&ndash;2018 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                RecommenderX. Dublin, Ireland
              </a>
            </h5>
            <h3>Lead Web Developer</h3>
            <h5>
              2013&ndash;2017 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                Ellefson Technology. Toronto, Canada
              </a>
            </h5>
            <h3>Project Manager & Web Developer (Contract)</h3>
            <h5>
              2012&ndash;2013 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                University of Toronto, Toronto, Canada
              </a>
            </h5>
            <h3>Database Engineer (Contract)</h3>
            <h5>
              2012 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
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
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                Technical University Dublin. Dublin, Ireland
              </a>
            </h5>
            <h3>MA, Renaissance Literature 1500-1700</h3>
            <h5>
              2013 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                University of York. York, England
              </a>
            </h5>
            <h3>BS, English Language & Literature</h3>
            <h5>
              2011 &mdash;{' '}
              <a
                href="libs/components/src/sections/resume"
                target="_blank"
                rel="noreferrer">
                University of Wisconsin-Madison. Madison, USA
              </a>
            </h5>
            <h2 className="section-header">Certifications</h2>
            <h4>
              2022 &mdash;{' '}
              <a
                href="https://www.credential.net/cb532277-9544-4ef9-b757-6f129467351c"
                target="_blank"
                rel="noreferrer">
                Google Cloud Certified – Associate Cloud Engineer
              </a>
            </h4>
            <h4>
              2021 &mdash;{' '}
              <a
                href="https://www.credly.com/badges/08765e92-c2fd-4eed-a08c-738cd59835e9"
                target="_blank"
                rel="noreferrer">
                Leading SAFe, Certified SAFe 5 Agilist
              </a>
            </h4>
            <h4>
              2020 &mdash;{' '}
              <a
                href="https://www.credly.com/badges/1453a04d-da48-4d94-a3d0-1c642d144fee"
                target="_blank"
                rel="noreferrer">
                AWS Certified Developer – Associate
              </a>
            </h4>
            <div id="resume-social-icons">
              <h3 id="resume-social-title">Find Me:</h3>
              <SocialMedia />
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
                <FontAwesomeIcon icon={faFileAlt} className="fa" />
              </>
            }
          />
        </section>
      </div>
      <Spacer color="blue" />
    </div>
  );
}
