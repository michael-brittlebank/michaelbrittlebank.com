import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/resume.css'

export default class Resume extends React.Component {
    render() {
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | Resume</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 className="page-title">Resume</h1>
                </div>
            </div>
        );
    }
}
