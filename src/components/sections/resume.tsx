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
              <strong>
                Strategic technology leader with over 14 years of experience driving digital transformation and
                high-impact software delivery across a wide range of industries
              </strong>
            </p>
            <p>
              <strong>
                Track record of delivering business value at every stage of implementation and in fostering innovative
                and high-performing engineering cultures with a continuous growth mindset
              </strong>
            </p>
            <p>
              <strong>
                Adept at bridging gaps and navigating business, technology, and humanities concerns
              </strong>
            </p>
            <p>
              <br />
              <small>
                Core Expertise: Software Engineering Leadership | Digital Transformation | Agile@Scale Operations |
                Workforce Planning | Team of Teams Agility | Cloud Architecture (AWS, GCP) | Solutions Architecture |
                Product, Project, & Portfolio Management
              </small>
            </p>
            <p>
              <small>
                Industry Experience: E-Commerce, Consulting, FinTech, Big Data & Data Visualization, Healthtech/Medtech,
                Retail, Warehouse Tech, Insurance & Insurtech, Small Business & Business to Business (B2B), Banking &
                Financial Services
              </small>
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
