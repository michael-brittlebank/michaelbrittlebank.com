import * as React from 'react';
import * as hauptstimmeJs from '../../../../node_modules/hauptstimme-js/dist';
import { Component } from 'react';

export default class Hauptstimme extends Component {
    componentDidMount() {
        console.log('I was triggered during componentDidMount');
        console.log('getting thing here', hauptstimmeJs.getLocalString(1));

    }

    render() {
        console.log('I was triggered during render');
        console.log('getting thing here', hauptstimmeJs.getLocalString(1));
        return (
            <div>
                <h1>Hauptstimme.JS</h1>
            </div>
        )
    }
}