import ReactIframeResizer from 'react-iframe-resizer-super';
import AnalyticsButton from "../components/analytics-button";

export default function ReadingList() {
  return (
    <section id="reading-list-container" className="col-sm-12 portfolio-item">
      <h2 id="reading-list-title" className="section-header">
        WP Reading List
      </h2>
      <p>
        This <a href="https://wordpress.org/plugins/wp-reading-list/" target="_blank" rel="noreferrer">
          WordPress plugin
        </a> is designed to help organise and display books, magazines,
        articles, and anything else that you have read lately. This plugin
        allows users to display what they have read, attach text like a review
        or notes to it, and provide a link to where visitors can find the piece.
      </p>
      <ReactIframeResizer
        title="WP Reading List"
        src="https://wordpress.mikestumpf.com/reading-list"
        iframeResizerOptions={{
          checkOrigin: false,
          heightCalculationMethod: 'documentElementOffset',
        }}
        className="no-border"
        iframeResizerUrl={false}
      />
      <AnalyticsButton href="https://github.com/mike-stumpf/wp-reading-list" action="readingListButtonClick"/>
    </section>
  );
}
