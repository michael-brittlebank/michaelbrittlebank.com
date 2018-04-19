import * as React from 'react';
import { Helmet } from 'react-helmet';
import ReactIframeResizer from 'react-iframe-resizer-super';
import * as Scroll from 'react-scroll';
import scroll = Scroll.animateScroll;

export default class ReadingList extends React.Component {

    private iframeHeight: number;

    constructor(props: any) {
        super(props);
        this.onResize = this.onResize.bind(this);
    }

    render() {
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | WP Reading List</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 className="page-title">WP Reading List</h1>
                </div>
                <div className="col-sm-12">
                    <ReactIframeResizer
                        src="http://wordpress.mikestumpf.com/reading-list"
                        iframeResizerOptions={{
                            checkOrigin: false,
                            heightCalculationMethod: 'max',
                            widthCalculationMethod: 'max',
                            resizedCallback: this.onResize
                        }}
                        className="no-border"
                        iframeResizerUrl={false}
                        id="reading-list-frame"
                    />
                    <a href="https://github.com/mike-stumpf/wp-reading-list" className="button" target="_blank">
                        <span>View Code</span>
                    </a>
                </div>
            </div>
        );
    }

    private onResize(iframe: any): void {
        if (this.iframeHeight !== iframe.height) {
            this.iframeHeight = iframe.height;
            scroll.scrollToTop({
                ignoreCancelEvents: true
            });
        }
    }
}
