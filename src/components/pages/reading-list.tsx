import * as React from 'react';
import { Helmet } from 'react-helmet';

export default class ReadingList extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Mike Stumpf | WP Reading List</title>
                </Helmet>
                <h1>WP Reading List</h1>
            </div>
        );
    }
}
