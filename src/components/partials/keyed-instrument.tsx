import * as React from 'react';
import { InstrumentInterface, NoteConstant } from 'hauptstimme-js';
import map = require('lodash/map')
import * as classNames from 'classnames';

interface Props {
    instrument: InstrumentInterface;
    selectedNotes: NoteConstant[];
}

export default class KeyedInstrument extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
        this._isBlackKey = this._isBlackKey.bind(this);
    }

    render() {
        return (
            <div className="chorus-piano-keyboard">
                {
                    map(this.props.instrument.rootNotes, (note: NoteConstant, index: number) => {
                        return (
                            <div
                                key={index}
                                className={classNames('chorus-piano-key', {
                                    'selected': this.props.selectedNotes.indexOf(note) !== -1,
                                    'black': this._isBlackKey(note),
                                    'white': !this._isBlackKey(note)
                                })}
                                data-note={note}
                            >
                                <p>
                                    <span>{NoteConstant[note]}</span>
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    private _isBlackKey(note: NoteConstant): boolean {
        return note === NoteConstant.AB || note === NoteConstant.CD || note === NoteConstant.DE || note === NoteConstant.FG || note === NoteConstant.GA;
    }
}