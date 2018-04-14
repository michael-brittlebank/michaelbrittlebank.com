import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Mike Stumpf</title>
                </Helmet>
                <h1>Welcome to the Tornadoes Website!</h1>
            </div>
        );
    }
}
