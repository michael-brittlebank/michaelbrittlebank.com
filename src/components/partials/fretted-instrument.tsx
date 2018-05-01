import * as React from 'react';
import { HauptstimmeJs, InstrumentInterface, NoteConstant } from 'hauptstimme-js';
import map = require('lodash/map')
import * as classNames from 'classnames';

interface Props {
    instrument: InstrumentInterface;
    selectedNotes: NoteConstant[];
    onClick: (note: NoteConstant) => void;
    onContextMenu: (note: NoteConstant) => void;
    rootNote: NoteConstant;
    resultNotes: NoteConstant[];
}

export default class FrettedInstrument extends React.Component<Props, any> {

    private static numberOfFrets: number = 12;

    private static _getFretMarkers(): string[] {
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

    private static _getFretsFromRootNote(rootNote: NoteConstant): NoteConstant[] {
        const output: NoteConstant[] = [rootNote];
        let currentNote: NoteConstant = rootNote;
        for (let i = 0; i <= FrettedInstrument.numberOfFrets - 1; i++) {
            currentNote = HauptstimmeJs.addHalfStepsToNote(currentNote, 1);
            output.push(currentNote);
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
                            >
                                {
                                    map(FrettedInstrument._getFretsFromRootNote(note), (fret: NoteConstant, innerIndex: number) => {
                                        return (
                                            <div
                                                key={innerIndex}
                                                className={classNames('fret note', {
                                                    'selected': this.props.selectedNotes.indexOf(fret) !== -1,
                                                    'root': this.props.rootNote === fret,
                                                    'found': this.props.resultNotes.indexOf(fret) !== -1
                                                })}
                                                data-note={fret}
                                                onClick={(e) => {e.preventDefault(); this.props.onClick(fret)}}
                                                onContextMenu={(e) => {e.preventDefault(); this.props.onContextMenu(fret)}}
                                            >
                                                <p>
                                                    <span>{HauptstimmeJs.getFormattedNoteString(fret)}</span>
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