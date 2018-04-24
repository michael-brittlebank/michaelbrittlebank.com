import * as React from 'react';
import ReactIframeResizer from 'react-iframe-resizer-super';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'

export default class ReadingList extends React.Component {
    render() {
        return (
            <div className="grid-container row section-container">
                <div className="col-sm-12">
                    <h1 id="reading-list-title" className="page-title">WP Reading List</h1>
                </div>
                <section id="reading-list-frame" className="col-sm-12">
                    <ReactIframeResizer
                        src="http://wordpress.mikestumpf.com/reading-list"
                        iframeResizerOptions={{
                            checkOrigin: false,
                            heightCalculationMethod: 'documentElementOffset'
                        }}
                        className="no-border"
                        iframeResizerUrl={false}
                    />
                    <a href="https://github.com/mike-stumpf/wp-reading-list" className="button" target="_blank">
                        <span>View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/></span>
                    </a>
                </section>
            </div>
        );
    }
}
