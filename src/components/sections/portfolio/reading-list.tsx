import * as React from 'react';
import ReactIframeResizer from 'react-iframe-resizer-super';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'

export default class ReadingList extends React.Component {
    render() {
        return (
            <section id="reading-list-container" className="col-sm-12 portfolio-item">
                <h2 id="reading-list-title" className="section-header">WP Reading List</h2>
                <p>
                    This <a href="https://wordpress.org/" target="_blank">WordPress</a> plugin is designed to help organise and display books, magazines, articles, and anything else that you have read lately. This plugin allows users to display what they have read, attach text like a review or notes to it, and provide a link to where visitors can find the piece. The plugin comes bundled with two archive templates (as well as templates for single items and "author" & "type" archives) and is easily customizable with CSS.
                </p>
                <p className="show-for-small">This project is best viewed on a larger screen and so is hidden for mobile devices.</p>
                <ReactIframeResizer
                    src="https://wordpress.mikestumpf.com/reading-list"
                    iframeResizerOptions={{
                        checkOrigin: false,
                        heightCalculationMethod: 'documentElementOffset'
                    }}
                    className="no-border hide-for-small"
                    iframeResizerUrl={false}
                />
                <a href="https://github.com/mike-stumpf/wp-reading-list" className="button" target="_blank">
                    View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/>
                </a>
            </section>
        );
    }
}
