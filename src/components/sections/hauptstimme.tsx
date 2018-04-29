import * as React from 'react';
import { HauptstimmeJs, SearchResponseInterface, InstrumentInterface, InstrumentTypeConstant, NoteConstant } from 'hauptstimme-js';
import '../../sass/components/sections/hauptstimme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import map = require('lodash/map')
import filter = require('lodash/filter')
import * as classNames from 'classnames';
import find = require('lodash/find')

interface State {
    availableInstruments: InstrumentInterface[];
    availableTunings: InstrumentInterface[];
    searchResults: SearchResponseInterface;
    selectedInstrument: InstrumentInterface;
    selectedTuning: InstrumentInterface;
    selectedNotes: NoteConstant[];
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
            selectedNotes: []
        };
        this.selectInstrument = this.selectInstrument.bind(this);
        this.selectTuning = this.selectTuning.bind(this);
    }

    componentDidMount() {
        HauptstimmeJs.getAvailableInstruments()
            .then((response: InstrumentInterface[]) => {
                this.setState({ availableInstruments: filter(response, (instrument: InstrumentInterface) => {
                        return instrument.type === InstrumentTypeConstant.FRETTED_INSTRUMENT || instrument.type === InstrumentTypeConstant.KEYED_INSTRUMENT;
                    }) });
                this.setState({ selectedInstrument: find(response, {name: 'Guitar'}) });
                this.setState({ availableTunings: filter(response, {type: InstrumentTypeConstant.ALTERNATE_TUNING}) });
            });
    }

    render() {
        return (
            <section id="hauptstimme-container" className="col-sm-12">
                <h2 id="hauptstimme-title" className="section-header">Hauptstimme.js</h2>
                <div>
                    <h3>About</h3>
                    <p>
                        This project is registered as a <a href="http://npmjs.com/package/hauptstimme-js" target="_blank">npm package</a>.
                    </p>
                    <p>
                        * There are <strong>90</strong> different fretted instrument tunings available as well as
                        piano.
                    </p>
                    <p>
                        * There are <strong>26</strong> searchable scale types resulting
                        in <strong>300</strong> possible variations based on the root note.
                    </p>
                    <p>
                        * There are <strong>45</strong> chord types which produce
                        over <strong>600</strong> searchable results.
                    </p>
                </div>
                <div className="col-sm-12 row">
                    <div className="col-sm-12 col-md-6">
                        <h4>Instruments</h4>
                        <div className="instrument-selector">
                            {map(this.state.availableInstruments, (instrument: InstrumentInterface, index: number) => {
                                return (
                                    <a
                                        key={index}
                                        className={classNames('available-instrument', {'selected': instrument === this.state.selectedInstrument})}
                                        onClick={(e) => this.selectInstrument(e, instrument)}
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
                                        onClick={(e) => this.selectTuning(e, instrument)}
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
                        {
                            this.state.selectedInstrument ? (
                                <p>
                                    selected instrument {this.state.selectedInstrument.name}
                                </p>
                            ) : null
                        }
                        {
                            this.state.selectedTuning ? (
                                <p>
                                    selected tuning {this.state.selectedTuning.name}
                                </p>
                            ) : null
                        }
                    </div>
                </div>
                <a href="https://github.com/mike-stumpf/hauptstimme.js" className="button" target="_blank">
                    <span>View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/></span>
                </a>
            </section>

            // <aside className="modal--fade" id="modal-chorus-info" data-stackable="false" tabIndex="-1" role="dialog"
            //        aria-labelledby="label-fade" aria-hidden="true">
            //     <div className="modal-inner">
            //         <div className="modal-content">
            //             <h3 className="modal-title">Info &ndash; General</h3>
            //             <p>
            //                 * This project is registered as a <a href="http://bower.io/" target="_blank">Bower</a> package.
            //             </p>
            //             <pre className="prettyprint">bower install chorus-js --save</pre>
            //             <br/>
            //             <p>
            //                 * This project was built entirely in native JavaScript and Sass.
            //             </p>
            //             <p>
            //                 * This project is able to search both musical scales and chords to match the selected notes on
            //                 the fretboard or piano keys.

            //                 <h3 className="modal-title">Info &ndash; Notes</h3>
            //                 <p>
            //                     * Search results do not include theoretical scales, i.e. scales that contain notes with more
            //                     than one sharp or flat.
            //                 </p>
            //                 <p>
            //                     <a href="https://github.com/mike-stumpf/chorus.js" target="_blank"
            //                        className="button portfolio-button-code">
            //                         <span>View Code</span>
            //                     </a>
            //                 </p>
            //         </div>
            //     </div>
            //     <a href="#!" className="modal-close" title="Close this modal"
            //        data-dismiss="modal" data-close="Close">&times;</a>
            // </aside>
            // <aside className="modal--fade" id="modal-chorus-help" data-stackable="false" tabIndex="-1" role="dialog"
            //        aria-labelledby="label-fade" aria-hidden="true">
            //     <div className="modal-inner">
            //         <div className="modal-content">
            //             <h3 className="modal-title">Help &ndash; How Do I Use It?</h3>
            //             <p>
            //                 Left click on any instrument fret or piano key. Your selection will be indicated by a blue
            //                 background around the note you chose.
            //             </p>
            //             <p className="chorus-note chorus-note-selected"><span>C&#9839;</span></p>
            //             <p>
            //                 Clicking a second time designates this note as the root note. This is illustrated by a red
            //                 background.
            //             </p>
            //             <p className="chorus-note chorus-note-root"><span>F&#9839;</span></p>
            //             <p>
            //                 After you are finished selecting the combination of notes you want to search for, hit the search
            //                 button.
            //             </p>
            //             <p className="text-center">
            //                 <a className="chorus-search-button">Search Chorus</a>
            //             </p>
            //             <p>
            //                 When the search has finished, the lists below the instrument will be populated with results that
            //                 match the notes you selected.
            //             </p>
            //             <p>
            //                 Left click on any of these search results to apply the selected result to the fretboard or piano
            //                 keys above. Notes that are in the search result you selected but are not a previously selected
            //                 or root note will have a gold background.
            //             </p>
            //             <p className="chorus-note chorus-note-found"><span>A</span></p>
            //             <p>
            //                 Click again on the same result to clear the result notes from the fretboard or piano keys. Click
            //                 on another result to have the first result cleared and the second result populate the
            //                 instrument's notes.
            //             </p>
            //             <h3 className="modal-title">Help &ndash; Notes</h3>
            //             <p>
            //                 * There can only be one root note per instrument.
            //             </p>
            //             <p>
            //                 * Right click on a selected note or root note to clear its designation.
            //             </p>
            //         </div>
            //     </div>
            //     <a href="#!" className="modal-close" title="Close this modal"
            //        data-dismiss="modal" data-close="Close">&times;</a>
            // </aside>

        )
    }

    private selectInstrument(e: React.MouseEvent<HTMLAnchorElement>, instrument: InstrumentInterface): void {
        e.preventDefault();
        this.setState({ selectedInstrument: instrument });
        this.setState({ selectedTuning: undefined });
    }

    private selectTuning(e: React.MouseEvent<HTMLAnchorElement>, instrument: InstrumentInterface): void {
        e.preventDefault();
        this.setState({ selectedTuning: instrument });
        this.setState({ selectedInstrument: undefined });
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
}