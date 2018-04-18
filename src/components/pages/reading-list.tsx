import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class ReadingList extends React.Component {
    render() {
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | WP Reading List</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 className="page-title">WP Reading List</h1>
                </div>
            </div>
        );
    }
}
