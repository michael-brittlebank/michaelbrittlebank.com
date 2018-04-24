import * as React from 'react'
import { Helmet } from 'react-helmet';

export default class Head extends React.Component {
    render () {
        return (
            <Helmet>
                <title>Mike Stumpf</title>
            </Helmet>
        );
    }
}