import * as React from 'react';
import { InstrumentInterface, NoteConstant } from 'hauptstimme-js';

interface Props {
    instrument: InstrumentInterface;
    selectedNotes: NoteConstant[];
}

export default class FrettedInstrument extends React.Component<Props, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <p>selected fretted instrument {this.props.instrument.name}</p>
        )
    }
}