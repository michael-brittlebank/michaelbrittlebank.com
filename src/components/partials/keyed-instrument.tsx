import * as React from 'react';
import { InstrumentInterface, NoteConstant } from 'hauptstimme-js';
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

export default class KeyedInstrument extends React.Component<Props, any> {

    private static _isBlackKey(note: NoteConstant): boolean {
        return note === NoteConstant.AB || note === NoteConstant.CD || note === NoteConstant.DE || note === NoteConstant.FG || note === NoteConstant.GA;
    }

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="piano-keyboard">
                {
                    map(this.props.instrument.rootNotes, (note: NoteConstant, index: number) => {
                        return (
                            <div
                                key={index}
                                className={classNames('piano-key', {
                                    'selected': this.props.selectedNotes.indexOf(note) !== -1,
                                    'black': KeyedInstrument._isBlackKey(note),
                                    'white': !KeyedInstrument._isBlackKey(note)
                                })}
                                data-note={note}
                                onClick={(e) => {e.preventDefault(); this.props.onClick(note)}}
                                onContextMenu={(e) => {e.preventDefault(); this.props.onContextMenu(note)}}
                            >
                                <p
                                    className={classNames('note', {
                                        'selected': this.props.selectedNotes.indexOf(note) !== -1,
                                        'root': this.props.rootNote === note,
                                        'found': this.props.resultNotes.indexOf(note) !== -1
                                    })}
                                >
                                    <span>{NoteConstant[note]}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}