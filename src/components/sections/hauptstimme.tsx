import * as React from 'react';
import { HauptstimmeJs, SearchResponseInterface, InstrumentInterface, InstrumentTypeConstant, NoteConstant } from 'hauptstimme-js';
import '../../sass/components/sections/hauptstimme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import map = require('lodash/map')
import filter = require('lodash/filter')
import * as classNames from 'classnames';
import find = require('lodash/find')
import FrettedInstrument from '../partials/fretted-instrument';
import KeyedInstrument from '../partials/keyed-instrument';
import uniq = require('lodash/uniq')
import concat = require('lodash/concat')

interface State {
    availableInstruments: InstrumentInterface[];
    availableTunings: InstrumentInterface[];
    searchResults: SearchResponseInterface;
    selectedInstrument: InstrumentInterface;
    selectedTuning: InstrumentInterface;
    selectedNotes: NoteConstant[];
    resultNotes: NoteConstant[];
    rootNote: NoteConstant;
}

export default class Hauptstimme extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            availableInstruments: [],
            availableTunings: [],
            searchResults: undefined,
            selectedInstrument: undefined,
            selectedTuning: undefined,
            selectedNotes: [],
            resultNotes: [],
            rootNote: undefined
        };
        this._selectInstrument = this._selectInstrument.bind(this);
        this._selectTuning = this._selectTuning.bind(this);
        this._search = this._search.bind(this);
        this._renderInstrument = this._renderInstrument.bind(this);
        this._selectNote = this._selectNote.bind(this);
        this._removeNote = this._removeNote.bind(this);
    }

    componentDidMount() {
        HauptstimmeJs.getAvailableInstruments()
            .then((response: InstrumentInterface[]) => {
                this.setState({ availableInstruments: filter(response, (instrument: InstrumentInterface) => {
                        return instrument.type === InstrumentTypeConstant.FRETTED_INSTRUMENT || instrument.type === InstrumentTypeConstant.KEYED_INSTRUMENT;
                    }) });
                this.setState({ selectedInstrument: find(response, {name: 'Piano'}) });
                this.setState({ availableTunings: filter(response, {type: InstrumentTypeConstant.ALTERNATE_TUNING}) });
            });
    }

    render() {
        return (
            <section id="hauptstimme-container" className="col-sm-12">
                <h2 id="hauptstimme-title" className="section-header">Hauptstimme.js</h2>
                <p>
                    This project is for searching musical scales and chords which match a selection of notes. It is registered as a <a href="http://npmjs.com/package/hauptstimme-js" target="_blank">npm package</a> and built with <a href="https://www.typescriptlang.org/" target="_blank"> TypeScript</a>.
                </p>
                <p>
                    There are <strong>91</strong> instrument tunings available and <strong>26</strong> scale and <strong>51</strong> chord types which produce <strong>312</strong> and <strong>612</strong> searchable variations, respectively.
                </p>
                <p>
                    When using the interface, left click on any instrument fret or key to select a note. Your selection will be indicated by a blue background around the note you chose. Clicking a second time designates this note as the root note. This is illustrated by a red background. Right click on any selected note or root note to clear it. After you are finished selecting the combination of notes you want to search for, hit the search button.
                </p>
                <p>
                    When the search has finished, the lists below the instrument will be populated with results that match the selected notes. Left click on any of these search results to apply it to the instrument above. Notes that are in the search result you selected but are not a user selected note will have a gold background. Click again on the same result to clear it from the instrument.
                </p>
                <div className="col-sm-12 row">
                    <div className="col-sm-12 col-md-6">
                        <h4>Instruments</h4>
                        <div className="instrument-selector">
                            {map(this.state.availableInstruments, (instrument: InstrumentInterface, index: number) => {
                                return (
                                    <a
                                        key={index}
                                        className={classNames('available-instrument', {'selected': instrument === this.state.selectedInstrument})}
                                        onClick={(e) => this._selectInstrument(e, instrument)}
                                    >
                                        {instrument.name}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <h4>Guitar Tunings</h4>
                        <div className="instrument-selector">
                            {map(this.state.availableTunings, (instrument: InstrumentInterface, index: number) => {
                                return (
                                    <a
                                        key={index}
                                        className={classNames('available-instrument', {'selected': instrument === this.state.selectedTuning})}
                                        onClick={(e) => this._selectTuning(e, instrument)}
                                    >
                                        {instrument.name}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <button className="button" onClick={(e) => this._search(e)}>
                            <span>Search</span>
                        </button>
                    </div>
                    <div className="col-sm-12">
                        {this._renderInstrument()}
                    </div>
                </div>
                <a href="https://github.com/mike-stumpf/hauptstimme.js" className="button" target="_blank">
                    <span>View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/></span>
                </a>
            </section>
        )
    }

    private _selectInstrument(e: React.MouseEvent<HTMLAnchorElement>, instrument: InstrumentInterface): void {
        e.preventDefault();
        if (!this.state.selectedInstrument || this.state.selectedInstrument !== instrument) {
            this.setState({
                selectedInstrument: instrument,
                selectedTuning: undefined,
                selectedNotes: []
            });
        }
    }

    private _selectTuning(e: React.MouseEvent<HTMLAnchorElement>, instrument: InstrumentInterface): void {
        e.preventDefault();
        if (!this.state.selectedTuning || this.state.selectedTuning !== instrument) {
            this.setState({
                selectedTuning: instrument,
                selectedInstrument: undefined,
                selectedNotes: []
            });
        }
    }

    private _search(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        HauptstimmeJs.search({
            rootNote: NoteConstant.A,
            notes: [
                NoteConstant.C,
                NoteConstant.D
            ]
        })
            .then((response: SearchResponseInterface) => {
                console.log('search', response);
            });
    }

    private _selectNote(note: NoteConstant): void {
        if (!isNaN(this.state.rootNote) && this.state.rootNote === note) {
            // remove note assignment
            this.setState({
                rootNote: undefined
            });
        } else if (this.state.selectedNotes.indexOf(note) !== -1) {
            let selectedNotes: NoteConstant[] = this.state.selectedNotes;
            if (selectedNotes.indexOf(note) !== -1) {
                // remove root note from selected notes
                selectedNotes.splice(selectedNotes.indexOf(note), 1);
            }
            if (!isNaN(this.state.rootNote)) {
                // move any previous root note back to selected
                selectedNotes = uniq(concat(selectedNotes, [this.state.rootNote]));
            }
            this.setState({
                selectedNotes: selectedNotes,
                rootNote: note
            });
        } else {
            // add to selected notes
            const selectedNotes = uniq(concat(this.state.selectedNotes, [note]));
            this.setState({
                selectedNotes: selectedNotes
            });
        }
    }

    private _removeNote(note: NoteConstant): void {
        if (!isNaN(this.state.rootNote) && this.state.rootNote === note) {
            // remove note assignment
            this.setState({
                rootNote: undefined
            });
        } else if (this.state.selectedNotes.indexOf(note) !== -1) {
            let selectedNotes: NoteConstant[] = this.state.selectedNotes;
            if (selectedNotes.indexOf(note) !== -1) {
                // remove root note from selected notes
                selectedNotes.splice(selectedNotes.indexOf(note), 1);
            }
            this.setState({
                selectedNotes: selectedNotes
            });
        }
    }

    private _renderInstrument(): any {
        if (this.state.selectedInstrument || this.state.selectedTuning) {
            const instrument: InstrumentInterface = this.state.selectedInstrument ? this.state.selectedInstrument : this.state.selectedTuning;
            if (instrument.type === InstrumentTypeConstant.KEYED_INSTRUMENT) {
                return (
                    <KeyedInstrument
                        instrument={instrument}
                        selectedNotes={this.state.selectedNotes}
                        resultNotes={this.state.resultNotes}
                        rootNote={this.state.rootNote}
                        onClick={this._selectNote}
                        onContextMenu={this._removeNote}
                    />
                )
            } else {
                return (
                    <FrettedInstrument instrument={instrument} selectedNotes={this.state.selectedNotes}/>
                );
            }
        } else {
            return null;
        }
    }
}