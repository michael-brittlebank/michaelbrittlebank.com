import * as React from 'react';
import {HauptstimmeJs, InstrumentTypeConstant} from 'hauptstimme-js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import * as classNames from 'classnames';
import FrettedInstrument from './partials/fretted-instrument';
import KeyedInstrument from './partials/keyed-instrument';

export default class Hauptstimme extends React.Component {

 hauptstimme;

 constructor(props) {
  super(props);
  this.state = {
   availableInstruments: [],
   availableTunings: [],
   searchResults: undefined,
   selectedInstrument: undefined,
   selectedTuning: undefined,
   selectedNotes: [],
   rootNote: undefined,
   selectedScale: undefined,
   selectedChord: undefined
  };
  this._selectInstrument = this._selectInstrument.bind(this);
  this._selectTuning = this._selectTuning.bind(this);
  this._search = this._search.bind(this);
  this._renderInstrument = this._renderInstrument.bind(this);
  this._selectNote = this._selectNote.bind(this);
  this._removeNote = this._removeNote.bind(this);
  this._selectChord = this._selectChord.bind(this);
  this._selectScale = this._selectScale.bind(this);
 }

 componentDidMount() {
  const {availableInstruments, selectedInstrument} = this.state;
  this.hauptstimme = new HauptstimmeJs();
  this.hauptstimme.getAvailableInstruments()
    .then((response) => {
     this.setState({
      availableInstruments: response.filter((instrument) => instrument.type === InstrumentTypeConstant.FRETTED_INSTRUMENT || instrument.type === InstrumentTypeConstant.KEYED_INSTRUMENT),
      selectedInstrument: response.find((instrument) => instrument.name === 'Guitar'),
      availableTunings: response.filter((instrument) => instrument.type === InstrumentTypeConstant.ALTERNATE_TUNING)
     });
    })
    .then(() => {
     const {selectedInstrument, availableInstruments} = this.state;
     // set default scroll in instrument container to show user active state
     const myElement = document.getElementById('instrument-' + availableInstruments.findIndex((instrument) => instrument.name === selectedInstrument.name));
     document.getElementById('instrument-container').scrollTop = myElement.offsetTop - 55;
    });
 }

 render() {
  const {
   availableInstruments,
   availableTunings,
   selectedInstrument,
   selectedTuning,
   rootNote,
   selectedNotes,
   searchResults,
   selectedChord,
   selectedScale
  } = this.state
  return (
    <section id="hauptstimme-container" className="col-sm-12">
     <h2 id="hauptstimme-title" className="section-header">Hauptstimme.js</h2>
     <p>
      This project is for searching musical scales and chords which match a selection of notes. It is registered as a <a
       href="http://npmjs.com/package/hauptstimme-js" target="_blank">npm package</a> and built with <a
       href="https://www.typescriptlang.org/" target="_blank"> TypeScript</a>.
     </p>
     <p>
      There are <strong>91</strong> instrument tunings available and <strong>26</strong> scale
      and <strong>51</strong> chord types which produce <strong>312</strong> and <strong>612</strong> searchable
      variations, respectively.
     </p>
     <p>
      When using the interface, left click on any instrument fret or key to select a note. Your selection will be
      indicated by a blue background around the note you chose. Clicking a second time designates this note as the root
      note. This is illustrated by a red background. Right click on any selected note or root note to clear it. After
      you are finished selecting the combination of notes you want to search for, hit the search button.
     </p>
     <p>
      When the search has finished, the lists below the instrument will be populated with results that match the
      selected notes. Left click on any of these search results to apply it to the instrument above. Notes that are in
      the search result you selected but are not a user selected note will have a gold background. Click again on the
      same result to clear it from the instrument.
     </p>
     <div className="col-sm-12 row">
      <div className="col-sm-12 col-md-6">
       <h4>Instruments</h4>
       <div id="instrument-container" className="list-item-selector">
        {availableInstruments.map((instrument, index) => {
         return (
           <a
             id={'instrument-' + index}
             key={index}
             className={classNames('list-item', {'selected': instrument === selectedInstrument})}
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
       <div className="list-item-selector">
        {availableTunings.map((instrument, index) => {
         return (
           <a
             key={index}
             className={classNames('list-item', {'selected': instrument === selectedTuning})}
             onClick={(e) => this._selectTuning(e, instrument)}
           >
            {instrument.name}
           </a>
         )
        })}
       </div>
      </div>
     </div>
     {this._renderInstrument()}
     <button
       className={classNames('button', {
        'disabled': isNaN(rootNote) && selectedNotes.length < 1
       })}
       onClick={(e) => this._search(e)}
     >
      Search
     </button>
     <div className="col-sm-12 row">
      {
       searchResults && searchResults.chords ? (
         <div className="col-sm-12 col-md-6">
          <h4>Chord Results</h4>
          <div className="list-item-selector">
           {
            searchResults.chords.length > 0 ?
             searchResults.chords.map((chord, index) => {
               return (
                 <a
                   key={index}
                   className={classNames('list-item', {'selected': chord === selectedChord})}
                   onClick={(e) => this._selectChord(e, chord)}
                 >
                  {chord.name} – {chord.description}
                 </a>
               )
              }) :
              (
                <p className="no-results">No Results.</p>
              )
           }
          </div>
         </div>
       ) : null
      }
      {
       searchResults && searchResults.scales ? (
         <div className="col-sm-12 col-md-6">
          <h4>Scale Results</h4>
          <div className="list-item-selector">
           {
            searchResults.scales.length > 0 ?
              searchResults.scales.map((scale, index) => {
               return (
                 <a
                   key={index}
                   className={classNames('list-item', {'selected': scale === selectedScale})}
                   onClick={(e) => this._selectScale(e, scale)}
                 >
                  {scale.name} – {scale.description}
                 </a>
               )
              }) :
              (
                <p className="no-results">No Results.</p>
              )
           }
          </div>
         </div>
       ) : null
      }
      {
       !searchResults ? (
         <div id="no-search" className="col-sm-12">
          <p>Please select some notes and hit the search button to get matching chords and scales</p>
         </div>
       ) : null
      }
     </div>
     <a href="https://github.com/mike-stumpf/hauptstimme.js" className="button" target="_blank">
      View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/>
     </a>
    </section>
  )
 }

 _selectInstrument(e, instrument) {
  e.preventDefault();
  const {selectedInstrument} = this.state
  if (!selectedInstrument || selectedInstrument !== instrument) {
   this.setState({
    selectedInstrument: instrument,
    selectedTuning: undefined
   });
  }
 }

 _selectTuning(e, instrument) {
  e.preventDefault();
  const {selectedTuning} = this.state
  if (!selectedTuning || selectedTuning !== instrument) {
   this.setState({
    selectedTuning: instrument,
    selectedInstrument: undefined
   });
  }
 }

 _search(e) {
  e.preventDefault();
  const {rootNote, selectedNotes} = this.state
  if (!isNaN(rootNote) || selectedNotes.length > 0) {
   this.hauptstimme.search({
    rootNote: rootNote,
    notes: selectedNotes
   })
     .then((response) => {
      this.setState({
       searchResults: response
      });
     });
  }
 }

 _selectNote(note) {
  let {rootNote, selectedNotes} = this.state
  if (!isNaN(rootNote) && rootNote === note) {
   // remove note assignment
   this.setState({
    rootNote: undefined
   });
   this._resetSearchResults();
  } else if (selectedNotes.indexOf(note) !== -1) {
   if (selectedNotes.indexOf(note) !== -1) {
    // remove root note from selected notes
    selectedNotes.splice(selectedNotes.indexOf(note), 1);
   }
   if (!isNaN(rootNote)) {
    // move any previous root note back to selected
    selectedNotes = [...selectedNotes, rootNote];
   }
   this.setState({
    selectedNotes: selectedNotes,
    rootNote: note
   });
   this._resetSearchResults();
  } else {
   // add to selected notes
   this.setState({
    selectedNotes: [...selectedNotes, note]
   });
   this._resetSearchResults();
  }
 }

 _removeNote(note) {
  const {rootNote, selectedNotes} = this.state
  if (!isNaN(rootNote) && rootNote === note) {
   // remove note assignment
   this.setState({
    rootNote: undefined
   });
   this._resetSearchResults();
  } else if (selectedNotes.indexOf(note) !== -1) {
   if (selectedNotes.indexOf(note) !== -1) {
    // remove root note from selected notes
    selectedNotes.splice(selectedNotes.indexOf(note), 1);
   }
   this.setState({
    selectedNotes: selectedNotes
   });
   this._resetSearchResults();
  }
 }

 _resetSearchResults() {
  this.setState({
   selectedChord: undefined,
   selectedScale: undefined,
   searchResults: undefined
  });
 }

 _selectChord(e, chord) {
  e.preventDefault();
  const {selectedChord} = this.state
  if (!selectedChord || selectedChord !== chord) {
   this.setState({
    selectedChord: chord,
    selectedScale: undefined
   });
  } else {
   this.setState({
    selectedChord: undefined
   });
  }
 }

 _selectScale(e, scale) {
  e.preventDefault();
  const {selectedScale} = this.state
  if (!selectedScale || selectedScale !== scale) {
   this.setState({
    selectedScale: scale,
    selectedChord: undefined
   });
  } else {
   this.setState({
    selectedScale: undefined
   });
  }
 }

 _getResultNotes() {
  const{selectedChord, selectedScale} = this.state
  if (selectedChord || selectedScale) {
   return selectedChord ?selectedChord.notes : selectedScale.notes;
  } else {
   return [];
  }
 }

 _renderInstrument() {
  const {selectedInstrument, selectedTuning, selectedNotes, rootNote}= this.state
  if (selectedInstrument || selectedTuning) {
   const instrument = selectedInstrument ? selectedInstrument : selectedTuning;
   if (instrument.type === InstrumentTypeConstant.KEYED_INSTRUMENT) {
    return (
      <KeyedInstrument
        instrument={instrument}
        selectedNotes={selectedNotes}
        resultNotes={this._getResultNotes()}
        rootNote={rootNote}
        onClick={this._selectNote}
        onContextMenu={this._removeNote}
      />
    )
   } else {
    return (
      <FrettedInstrument
        instrument={instrument}
        selectedNotes={selectedNotes}
        resultNotes={this._getResultNotes()}
        rootNote={rootNote}
        onClick={this._selectNote}
        onContextMenu={this._removeNote}
      />
    );
   }
  } else {
   return null;
  }
 }
}