import * as React from 'react';
import ReactIframeResizer from 'react-iframe-resizer-super';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'

export default class ReadingList extends React.Component {
    render() {
        return (
            <section id="reading-list-container" className="col-sm-12">
                <h2 id="reading-list-title" className="section-header">WP Reading List</h2>
                <p className="show-for-small">This project is best viewed on a larger screen and so is hidden for mobile devices.</p>
                <ReactIframeResizer
                    src="http://wordpress.mikestumpf.com/reading-list"
                    iframeResizerOptions={{
                        checkOrigin: false,
                        heightCalculationMethod: 'documentElementOffset'
                    }}
                    className="no-border hide-for-small"
                    iframeResizerUrl={false}
                />
                <a href="https://github.com/mike-stumpf/wp-reading-list" className="button" target="_blank">
                    <span>View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/></span>
                </a>
            </section>
        );
    }
}
