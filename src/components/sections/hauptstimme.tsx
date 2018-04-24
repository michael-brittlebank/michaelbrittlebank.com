import * as React from 'react';
import { HauptstimmeJs, NoteConstant, SearchResponseInterface, InstrumentInterface, ScaleInterface, ChordInterface } from 'hauptstimme-js';
import '../../sass/components/sections/hauptstimme.css'

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
            <div id="hauptstimme-container" className="grid-container row section-container">
                <div className="col-sm-12">
                    <h1 id="hauptstimme-title" className="page-title">Hauptstimme.js</h1>
                </div>
                <section className="col-sm-12">
                    hauptstimme
                </section>
            </div>

            //     < main
            // id = "portfolio-chorus"
            // className = "grid-container row page-container" >
            //     < h1
            // className = "page-title col-sm-12" > Chorus.js < /h1>
            // <nav className="col-sm-8 no-padding">
            //     <a className="chorus-tab active" data-id="chorus-guitar" data-height="400">Guitar</a>
            //     <a className="chorus-tab" data-id="chorus-piano" data-height="575">Piano</a>
            //     <a className="chorus-tab" data-id="chorus-bass" data-height="300">Bass</a>
            // </nav>
            // < nav
            // className = "col-sm-4 no-padding text-right" >
            //     < a
            // href = "#modal-chorus-help"
            // className = "chorus-tab" > Help < /a>
            // <a href="#modal-chorus-info" className="chorus-tab">Info</a>
            // < /nav>
            // <section id="chorus-main-container" className="col-sm-12">
            //     <div id="chorus-guitar" className="chorus-instrument-container"></div>
            //     <div id="chorus-piano" className="chorus-instrument-container"></div>
            //     <div id="chorus-bass" className="chorus-instrument-container"></div>
            // </section>
            // < section
            // className = "col-sm-12 col-md-6" >
            //     < h3 > Scales < /h3>
            // <div id="results-scales" className="results-container">
            //     No results yet
            // </div>
            // < /section>
            // <section className="col-sm-12 col-md-6">
            //     <h3>Chords</h3>
            //     <div id="results-chords" className="results-container">
            //         No results yet
            //     </div>
            // </section>
            // < /main>
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
            //                 <p>
            //                     * There are <strong>90</strong> different fretted instrument tunings available as well as
            //                     piano.
            //                 </p>
            //                 <p>
            //                     * There are <strong>26</strong> searchable scale types resulting
            //                     in <strong>300</strong> possible variations based on the root note.
            //                 </p>
            //                 <p>
            //                     * There are <strong>45</strong> chord types which produce
            //                     over <strong>600</strong> searchable results.
            //                 </p>
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
}