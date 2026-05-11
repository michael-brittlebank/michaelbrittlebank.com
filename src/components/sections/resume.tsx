import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { AnalyticsButton, Quote, SocialMedia, Spacer } from '../shared';
import { DataService } from '@/services';
import { ResumeEntry } from '@/types';
import classNames from 'classnames';
import Carousel from '../shared/carousel';
import React from 'react';

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
    <h3 className='resume-entry-title'>{resumeEntry.title}</h3>
    <h5 className='resume-entry-subtitle'>
      {joinWithElement(resumeEntry.years)} &mdash;{' '}
      <a href={resumeEntry.url} target='_blank' rel='noreferrer'>
        {resumeEntry.location}
      </a>
    </h5>
  </div>
);

const renderMonolineResumeEntry = (resumeEntry: ResumeEntry) => (
  <h4 key={resumeEntry.title} className='resume-entry-title'>
    {joinWithElement(resumeEntry.years)} &mdash;{' '}
    <a href={resumeEntry.url} target='_blank' rel='noreferrer'>
      {resumeEntry.title}
    </a>
  </h4>
);

export function Resume() {
  const workExperiences = DataService.getResumeExperience();
  const education = DataService.getResumeEducation();
  const certificates = DataService.getResumeCertificates();
  const freelanceProjects = DataService.getFreelancingProjects();
  return (
    <div id='resume-container'>
      <div className='grid-container row'>
        <div className='col-sm-12'>
          <h1 id='resume-title' className='page-title'>
            Resume
          </h1>
        </div>
        <Quote
          message='Experience is simply the name we give our mistakes.'
          author='Oscar Wilde'
        />
        <section id='resume-body' className='row'>
          <section className='col-sm-12'>
            <p>
              I bridge the gap between business strategy and highly efficient, scalable software delivery to help
              organizations systematically deliver iterative, high-impact products.
            </p>
            <p>
              As an engineering leader I specialize in guiding remote and hybrid multidisciplinary teams through the
              realities of Digital Transformation, Lean/Agile operations, and volatile, ever-changing technical and
              business environments. I drive sustainable outcomes that align engineering output to business value by
              leveraging my deep technical breadth to build innovative solutions that delight stakeholders.
            </p>
            <p>
              <br />
              How I Deliver Impact:
              <ul>
                <li>
                  <strong>Strategic Leadership & Scale:</strong> Experienced in driving Team-of-Teams agility,
                  Agile@Scale (SAFe, Scrum,
                  Kanban), and workforce planning for distributed remote/hybrid teams. I convert broad organizational
                  vision
                  into practical, highly functional delivery roadmaps and product portfolios.
                </li>
                <li>
                  <strong>Engineering Excellence:</strong> Grounded in a strong background as a business solutions
                  architect and
                  remaining a
                  hands-on polyglot engineer myself. My teams build scalable RESTful microservice APIs, cross-platform
                  mobile and web applications, and resilient cloud DevOps environments (AWS, GCP) utilizing TDD and
                  DRY/SOLID principles.
                </li>
                <li>
                  <strong>People & Culture First:</strong> Passionate about empathetic leadership, servant coaching, and
                  continuous
                  learning.
                  I am deeply invested in raising others up and building psychologically safe, high-trust team cultures.
                </li>
              </ul>
            </p>
            <p>
              <br />
              Core Expertise: Software Engineering Leadership | Digital Transformation | Agile@Scale Operations |
              Workforce Planning | Team of Teams Agility | Cloud Architecture (AWS, GCP) | Solutions Architecture |
              Product, Project, & Portfolio Management
            </p>
            <p>
              Industry Experience: E-Commerce, Consulting, FinTech, Big Data & Data Visualization, Healthtech/Medtech,
              Retail, Warehouse Tech, Insurance & Insurtech, Small Business & Business to Business (B2B), Banking &
              Financial Services
            </p>
            <p>
              <br />
              Family first | Lifelong leader, teacher, and coach | Expert generalist
            </p>
          </section>
          <section className='col-sm-12 col-md-6'>
            <h2 className='section-header'>Experience &nbsp;(Selected)</h2>
            {workExperiences.map((entry) => renderMultilineResumeEntry(entry))}
          </section>
          <section className='col-sm-12 col-md-6'>
            <h2 className='section-header'>Education</h2>
            {education.map((entry) => renderMultilineResumeEntry(entry, true))}
            <h2 className='section-header'>
              Professional Development &nbsp;(Selected)
            </h2>
            {certificates.map(renderMonolineResumeEntry)}
            <div id='resume-social-icons'>
              <h3 id='resume-social-title'>Find Me:</h3>
              <SocialMedia />
            </div>
          </section>
        </section>
        <section className='col-sm-12'>
          <AnalyticsButton
            href='/files/Resume_Michael_Brittlebank.pdf'
            action='resumeButtonClick'
            content={
              <>
                Download Resume&nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faFileAlt} className='fa' />
              </>
            }
          />
        </section>
      </div>
      <div className='grid-container row'>
        <section className='col-sm-12 no-padding'>
          <h2 className='section-header'>Freelancing &nbsp;(Selected)</h2>
          <Carousel slides={freelanceProjects} />
        </section>
      </div>
      <Spacer color='blue' />
    </div>
  );
}
