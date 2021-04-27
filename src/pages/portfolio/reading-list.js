import ReactIframeResizer from 'react-iframe-resizer-super';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub';

export default function ReadingList() {
  return (
    <section id="reading-list-container" className="col-sm-12 portfolio-item">
      <h2 id="reading-list-title" className="section-header">
        WP Reading List
      </h2>
      <p>
        This <a href="https://wordpress.org/plugins/wp-reading-list/" target="_blank">
          WordPress plugin
        </a> is designed to help organise and display books, magazines,
        articles, and anything else that you have read lately. This plugin
        allows users to display what they have read, attach text like a review
        or notes to it, and provide a link to where visitors can find the piece.
      </p>
      <ReactIframeResizer
        src="https://wordpress.mikestumpf.com/reading-list"
        iframeResizerOptions={{
          checkOrigin: false,
          heightCalculationMethod: 'documentElementOffset',
        }}
        className="no-border"
        iframeResizerUrl={false}
      />
      <a
        href="https://github.com/mike-stumpf/wp-reading-list"
        className="button"
        target="_blank">
        View Code&nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon={faGithub} className="fa" />
      </a>
    </section>
  );
}
