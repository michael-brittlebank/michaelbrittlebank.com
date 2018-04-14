import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/home.css'

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Mike Stumpf</title>
                </Helmet>
                <h1>Homepage</h1>
            </div>
        );
    }
}
