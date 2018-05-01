import * as React from 'react';
import { HauptstimmeJs, InstrumentInterface, NoteConstant } from 'hauptstimme-js';
import map = require('lodash/map')

interface Props {
    instrument: InstrumentInterface;
    selectedNotes: NoteConstant[];
    onClick: (note: NoteConstant) => void;
    onContextMenu: (note: NoteConstant) => void;
    rootNote: NoteConstant;
    resultNotes: NoteConstant[];
}

export default class FrettedInstrument extends React.Component<Props, any> {

    private static _getFretMarkers(): string[] {
        const output = [];
        for (let i = 0; i < 13; i++) {
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

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="instrument-container">
                {/*fret markers*/}
                <div className="string fret-marker">
                    {
                        map(FrettedInstrument._getFretMarkers(), (fretMarker: string, index: number) => {
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
                    map(this.props.instrument.rootNotes, (note: NoteConstant, index: number) => {
                        return (
                            <div
                                key={index}
                                className="string"
                                onClick={(e) => {e.preventDefault(); this.props.onClick(note)}}
                                onContextMenu={(e) => {e.preventDefault(); this.props.onContextMenu(note)}}
                            >
                                <div
                                    className="fret note"
                                    data-note={note}
                                >
                                    <p>
                                        <span>{HauptstimmeJs.getFormattedNoteString(note)}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}