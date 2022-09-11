import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { AnalyticsButton, SocialMedia, Spacer } from '../shared';
import { DataService } from '@mikestumpf/services';
import { ResumeEntry } from '@mikestumpf/types';

const joinWithElement = (entries: (string | number)[]) =>
  entries.map((year, index) => (
    <>
      {index !== 0 && <>&ndash;</>}
      {year}
    </>
  ));

const renderPrimaryResumeEntry = (resumeEntry: ResumeEntry) => (
  <>
    <h3>{resumeEntry.title}</h3>
    <h5>
      {joinWithElement(resumeEntry.years)} &mdash;{' '}
      <a href={resumeEntry.url} target="_blank" rel="noreferrer">
        {resumeEntry.location}
      </a>
    </h5>
  </>
);

const renderSecondaryResumeEntry = (resumeEntry: ResumeEntry) => (
  <h4>
    {joinWithElement(resumeEntry.years)} &mdash;{' '}
    <a href={resumeEntry.url} target="_blank" rel="noreferrer">
      {resumeEntry.title}
    </a>
  </h4>
);

export function Resume() {
  const workExperiences = DataService.getResumeExperience();
  const education = DataService.getResumeEducation();
  const certificates = DataService.getResumeCertificates();
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
            <h2 className="section-header">Technological Leader</h2>
            <p>
              Respected technological leader skilled in guiding remote/hybrid
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
            {workExperiences.map(renderPrimaryResumeEntry)}
          </section>
          <section className="col-sm-12 col-md-6">
            <h2 className="section-header">Education</h2>
            {education.map(renderPrimaryResumeEntry)}
            <h2 className="section-header">Certifications</h2>
            {certificates.map(renderSecondaryResumeEntry)}
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