import * as React from 'react';
import { HauptstimmeJs, NoteConstant } from 'hauptstimme-js';
import * as classNames from 'classnames';

export default class KeyedInstrument extends React.Component {

    static _isBlackKey(note) {
        return note === NoteConstant.AB || note === NoteConstant.CD || note === NoteConstant.DE || note === NoteConstant.FG || note === NoteConstant.GA;
    }

    render() {
        const {instrument, selectedNotes, onClick, rootNote, resultNotes, onContextMenu} = this.props
        return (
            <div className="instrument-container piano-keyboard">
                {
                    instrument.rootNotes.map((note, index) => {
                        return (
                            <div
                                key={index}
                                className={classNames('piano-key', {
                                    'selected': selectedNotes.indexOf(note) !== -1,
                                    'black': KeyedInstrument._isBlackKey(note),
                                    'white': !KeyedInstrument._isBlackKey(note)
                                })}
                                data-note={note}
                                onClick={(e) => {e.preventDefault(); onClick(note)}}
                                onContextMenu={(e) => {e.preventDefault(); onContextMenu(note)}}
                            >
                                <p
                                    className={classNames('note', {
                                        'selected': selectedNotes.indexOf(note) !== -1,
                                        'root': rootNote === note,
                                        'found': resultNotes.indexOf(note) !== -1
                                    })}
                                >
                                    <span>{HauptstimmeJs.getFormattedNoteString(note)}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}