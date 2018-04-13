import * as React from 'react';
import { HauptstimmeJs, NoteConstant, SearchResponseInterface, InstrumentInterface, ScaleInterface, ChordInterface } from '../../../../node_modules/hauptstimme-js/dist';
import { Component } from 'react';

export default class Hauptstimme extends Component {
    componentDidMount() {
        console.log('getting thing here', NoteConstant[NoteConstant.AB]);
        HauptstimmeJs.getAvailableInstruments()
            .then((response: InstrumentInterface[]) => {
                // console.log('instruments', response);
            });
        HauptstimmeJs.getAvailableScales()
            .then((response: ScaleInterface[]) => {
                // console.log('scales', response);
            });
        HauptstimmeJs.getAvailableChords()
            .then((response: ChordInterface[]) => {
                // console.log('chords', response);
            });
        HauptstimmeJs.search({
            rootNote: NoteConstant.A,
            notes: [
                NoteConstant.C,
                NoteConstant.D
            ]
        })
            .then((response: SearchResponseInterface) => {
                // console.log('search', response);
            });

        // console.log('demo', HauptstimmeJs.demo());
    }

    render() {
        console.log('I was triggered during render');
        return (
            <div>
                <h1>Hauptstimme.JS</h1>
            </div>
        )
    }
}