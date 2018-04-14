import * as React from 'react';
import { HauptstimmeJs, NoteConstant, SearchResponseInterface, InstrumentInterface, ScaleInterface, ChordInterface } from 'hauptstimme-js';
import { Helmet } from 'react-helmet';

export default class Hauptstimme extends React.Component {
    componentDidMount() {
        // console.log('getting thing here', NoteConstant[NoteConstant.AB]);
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
        return (
            <div>
                <Helmet>
                    <title>Mike Stumpf | Hauptstimme</title>
                </Helmet>
                <h1>Hauptstimme.JS</h1>
            </div>
        )
    }
}