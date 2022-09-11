import IframeResizer from 'iframe-resizer-react';
import { AnalyticsButton } from '../shared';
import { ConfigService } from '@mikestumpf/services';

export function ReadingList() {
  return (
    <section id="reading-list-container" className="col-sm-12 portfolio-item">
      <h2 id="reading-list-title" className="section-header">
        WP Reading List
      </h2>
      <p>
        This{' '}
        <a
          href="libs/components/src/portfolio/reading-list"
          target="_blank"
          rel="noreferrer">
          WordPress plugin
        </a>{' '}
        is designed to help organise and display books, magazines, articles, and
        anything else that you have read lately. This plugin allows users to
        display what they have read, attach text like a review or notes to it,
        and provide a link to where visitors can find the piece.
      </p>
      <IframeResizer
        log={ConfigService.isDevEnvironment()}
        src="https://wordpress.mikestumpf.com/reading-list"
        className="reading-list-iframe-container"
        bodyPadding="15px"
      />
      <AnalyticsButton
        href="https://github.com/mike-stumpf/wp-reading-list"
        action="readingListButtonClick"
      />
    </section>
  );
}
