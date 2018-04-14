import * as React from 'react';
import { Link } from 'react-router-dom'

export default class Portfolio extends React.Component {
    render() {
        return (
            // https://medium.com/@ebakhtarov/handling-of-iframes-in-react-f038be46ac24
            <div>
                <h1>Portfolio</h1>
                <Link to="/hauptstimme-js">HauptstimmeJS</Link>
            </div>
        );
    }
}
