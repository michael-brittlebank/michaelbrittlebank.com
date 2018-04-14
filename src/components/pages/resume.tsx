import * as React from 'react';
import { Helmet } from 'react-helmet';

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
