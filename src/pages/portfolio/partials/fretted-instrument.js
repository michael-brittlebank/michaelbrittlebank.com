import * as React from 'react';
import { HauptstimmeJs } from 'hauptstimme-js';
import * as classNames from 'classnames';

export default class FrettedInstrument extends React.Component {

    numberOfFrets = 12;

    static _getFretMarkers() {
        const output = [];
        for (let i = 0; i <= FrettedInstrument.numberOfFrets; i++) {
            if (i === 3 || i === 5 || i ===9) {
                output.push(String.fromCharCode(9678));
            } else if (i === 7 || i === 12) {
                output.push(String.fromCharCode(9673) + String.fromCharCode(9673));
            } else {
                output.push(String.fromCharCode(160));
            }
        }
        return output;
    }

     static _getFretsFromRootNote(rootNote) {
        const output = [rootNote];
        let currentNote = rootNote;
        for (let i = 0; i <= FrettedInstrument.numberOfFrets - 1; i++) {
            currentNote = HauptstimmeJs.addHalfStepsToNote(currentNote, 1);
            output.push(currentNote);
        }
        return output;
    }

    constructor(props) {
        super(props);
        const {instrument} = this.props
        this.state = {
            // reverse strings to show in correct order
            rootNotes: instrument && instrument.rootNotes ? [...instrument.rootNotes].reverse() : []
        };
    }

    componentWillReceiveProps(props) {
        if (props.instrument.id !== this.props.instrument.id) {
            this.setState({
                rootNotes: [...props.instrument.rootNotes].reverse()
            })
        }
    }

    render() {
        const {selectedNotes, rootNote, resultNotes, onClick, onContextMenu} = this.props
        const {rootNotes} = this.state
        return (
            <div className="instrument-container">
                {/*fret markers*/}
                <div className="string fret-marker">
                    {
                        FrettedInstrument._getFretMarkers().map((fretMarker, index) => {
                            return (
                                <div key={index} className="fret">
                                    {fretMarker}
                                </div>
                            );
                        })
                    }
                </div>
                {/*main strings*/}
                {
                    rootNotes.map((note, index) => {
                        return (
                            <div
                                key={index}
                                className="string"
                            >
                                {
                                    FrettedInstrument._getFretsFromRootNote(note).map((fret, innerIndex) => {
                                        return (
                                            <div
                                                key={innerIndex}
                                                className={classNames('fret note', {
                                                    'selected': selectedNotes.indexOf(fret) !== -1,
                                                    'root': rootNote === fret,
                                                    'found': resultNotes.indexOf(fret) !== -1
                                                })}
                                                data-note={fret}
                                                onContextMenu={(e) => {e.preventDefault()}}
                                            >
                                                <p>
                                                    <span
                                                        onClick={(e) => {e.preventDefault(); onClick(fret)}}
                                                        onContextMenu={(e) => {e.preventDefault(); onContextMenu(fret)}}
                                                    >
                                                        {HauptstimmeJs.getFormattedNoteString(fret)}
                                                    </span>
                                                </p>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}