import { PureComponent } from 'react';
import { Constants, Util as HauptstimmeJs } from 'hauptstimme-js';
import classNames from 'classnames';

export class KeyedInstrument extends PureComponent {
  static _isBlackKey(note) {
    return (
      note === Constants.noteConstant.AB ||
      note === Constants.noteConstant.CD ||
      note === Constants.noteConstant.DE ||
      note === Constants.noteConstant.FG ||
      note === Constants.noteConstant.GA
    );
  }

  render() {
    const {
      instrument,
      selectedNotes,
      onClick,
      rootNote,
      resultNotes,
      onContextMenu,
    } = this.props;
    return (
      <div className="instrument-container piano-keyboard">
        {instrument &&
          instrument.rootNotes.map((note, index) => {
            return (
              <div
                key={index}
                className={classNames('piano-key', {
                  selected: selectedNotes.indexOf(note) !== -1,
                  black: KeyedInstrument._isBlackKey(note),
                  white: !KeyedInstrument._isBlackKey(note),
                })}
                data-note={note}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(note);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  onContextMenu(note);
                }}>
                <p
                  className={classNames('note', {
                    selected: selectedNotes.indexOf(note) !== -1,
                    root: rootNote === note,
                    found: resultNotes.indexOf(note) !== -1,
                  })}>
                  <span>
                    {HauptstimmeJs.getFormattedLetterFromNote({ note })}
                  </span>
                </p>
              </div>
            );
          })}
      </div>
    );
  }
}
