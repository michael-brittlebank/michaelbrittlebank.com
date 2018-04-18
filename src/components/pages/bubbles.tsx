import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/bubbles.css'

export default class Bubbles extends React.Component {
    render() {
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | Bubbles</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 className="page-title">Bubbles</h1>
                </div>
            </div>
        );
    }
}
