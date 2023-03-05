import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { AnalyticsButton, Quote, SocialMedia, Spacer } from '../shared';
import { DataService } from '@mikestumpf/services';
import { ResumeEntry } from '@mikestumpf/types';
import classNames from 'classnames';

const joinWithElement = (entries: (string | number)[]) =>
  entries.map((year, index) => (
    <span key={index}>
      {index !== 0 && <>&ndash;</>}
      {year}
    </span>
  ));

const renderMultilineResumeEntry = (
  resumeEntry: ResumeEntry,
  isSecondary?: boolean,
) => (
  <div
    key={resumeEntry.title}
    className={classNames('resume-entry', {
      primary: !isSecondary,
      secondary: isSecondary,
    })}>
    <h3 className="resume-entry-title">{resumeEntry.title}</h3>
    <h5 className="resume-entry-subtitle">
      {joinWithElement(resumeEntry.years)} &mdash;{' '}
      <a href={resumeEntry.url} target="_blank" rel="noreferrer">
        {resumeEntry.location}
      </a>
    </h5>
  </div>
);

const renderMonolineResumeEntry = (resumeEntry: ResumeEntry) => (
  <h4 key={resumeEntry.title} className="resume-entry-title">
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
        <Quote
          message="Experience is simply the name we give our mistakes."
          author="Oscar Wilde"
        />
        <section id="resume-body" className="row">
          <section className="col-sm-12">
            <p>
              Technology leader who empathetically drives culture and
              systematically delivers value. Skilled in managing remote & hybrid
              multidisciplinary teams and guiding organizations to more
              efficiently develop software products. Lifelong mentor, teacher,
              and coach committed to people development and raising others up
              holistically. Personally invested in a continuous learning mindset
              focusing on business and technology, breadth and depth. Current
              professional interests are Team of Teams agility, Agile@Scale
              operations, and Digital Transformation & Innovation.
            </p>
            <p>
              Effective communicator, project manager, and product owner
              experienced in workflow process improvement, organizational change
              management, and workforce planning who is able to influence,
              promote, and implement transformative technologies and processes.
              Agile evangelist incorporating the best of Scrum, Kanban, Lean,
              SAFe, Six Sigma, and other frameworks to meet deliverables.
              Doggedly focused on outcomes rather than outputs in order to
              deliver iterative, future-proof solutions which satisfy
              stakeholders across the organization.
            </p>
            <p>
              Strong background as a SOLID, DRY business solutions architect and
              software engineer with a wide range of experience building bespoke
              websites, RESTful APIs, cross-platform mobile apps, and cloud
              DevOps solutions. Advocate for test-driven development (TDD) and
              accustomed to context switching between a variety of projects,
              languages, and frameworks.
            </p>
          </section>
          <section className="col-sm-12 col-md-6">
            <h2 className="section-header">Experience &nbsp;(Selected)</h2>
            {workExperiences.map((entry) => renderMultilineResumeEntry(entry))}
          </section>
          <section className="col-sm-12 col-md-6">
            <h2 className="section-header">Education</h2>
            {education.map((entry) => renderMultilineResumeEntry(entry, true))}
            <h2 className="section-header">
              Professional Development &nbsp;(Selected)
            </h2>
            {certificates.map(renderMonolineResumeEntry)}
            <div id="resume-social-icons">
              <h3 id="resume-social-title">Find Me:</h3>
              <SocialMedia />
            </div>
          </section>
        </section>
        <section className="col-sm-12">
          <AnalyticsButton
            href="/files/Mike_Stumpf_Resume.pdf"
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
