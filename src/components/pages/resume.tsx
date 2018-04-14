import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/resume.css'

export default class Resume extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Mike Stumpf | Resume</title>
                </Helmet>
                <h1>Resume</h1>
            </div>
        );
    }
}
