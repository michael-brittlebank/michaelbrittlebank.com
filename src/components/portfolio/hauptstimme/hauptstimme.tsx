import * as React from 'react';
import { HauptstimmeJs, NotesConstant } from '../../../../node_modules/hauptstimme-js/dist';
import { Component } from 'react';

export default class Hauptstimme extends Component {
    componentDidMount() {
        console.log('I was triggered during componentDidMount');
        console.log('getting thing here', HauptstimmeJs.getLocalString(1), NotesConstant.AB);

    }

    render() {
        console.log('I was triggered during render');
        console.log('getting thing here', HauptstimmeJs.getLocalString(1));
        return (
            <div>
                <h1>Hauptstimme.JS</h1>
            </div>
        )
    }
}