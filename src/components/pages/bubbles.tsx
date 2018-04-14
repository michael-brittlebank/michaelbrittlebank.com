import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/bubbles.css'

export default class Bubbles extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Mike Stumpf | Bubbles</title>
                </Helmet>
                <h1>Bubbles</h1>
            </div>
        );
    }
}
