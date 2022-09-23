import IframeResizer from 'iframe-resizer-react';
import { AnalyticsButton } from '../shared';
import { ConfigService } from '@mikestumpf/services';
import { PortfolioQuote } from '../shared/portfolio-quote';

export function ReadingList() {
  return (
    <section id="reading-list-container" className="col-sm-12">
      <h2 id="reading-list-title" className="section-header">
        Latest Reading List
      </h2>
      <p className="section-description">
        <PortfolioQuote>
          The{' '}
          <a
            href="libs/components/src/portfolio/reading-list"
            target="_blank"
            rel="noreferrer">
            WP Reading List
          </a>{' '}
          plugin is designed to help organise and display books, magazines,
          articles, and anything else that you have read lately. This plugin
          allows users to display what they have read, attach text like a review
          or notes to it, and provide a link to where visitors can find the
          piece.
        </PortfolioQuote>
      </p>
      <p className="section-description">
        One of the first personal coding projects that I created was a{' '}
        <a href="https://wordpress.org/" target="_blank" rel="noreferrer">
          WordPress
        </a>{' '}
        plugin to display and record the books that I read. Here's everything
        that I have been reading recently:
      </p>
      <IframeResizer
        log={ConfigService.isDevEnvironment()}
        src="https://wordpress.mikestumpf.com/reading-list"
        className="reading-list-iframe-container border-frame"
        bodyPadding="15px"
      />
      <AnalyticsButton
        href="https://github.com/mike-stumpf/wp-reading-list"
        action="readingListButtonClick"
      />
    </section>
  );
}
