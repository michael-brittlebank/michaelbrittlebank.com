import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { AnalyticsButton } from '../shared';
import { AnalyticsService } from '@michaelbrittlebank/services';
import { PortfolioQuote } from '../shared/portfolio-quote';

export class Metronome extends PureComponent {
  myWorker;
  maxValue = 220;
  minValue = 40;
  setBpmDebounceTimeout; // https://github.com/Microsoft/TypeScript/issues/842
  metronomeTick;
  metronomeTock;
  availableSubdivisions = [
    {
      label: 'Whole Note',
      value: 1,
    },
    {
      label: 'Half Note',
      value: 2,
    },
    {
      label: 'Triplet Note',
      value: 3,
    },
    {
      label: 'Quarter Note',
      value: 4,
    },
  ];
  longPressInterval; // https://github.com/Microsoft/TypeScript/issues/842

  constructor(props) {
    super(props);
    this.state = {
      isMetronomeStarted: false,
      currentBpm: 100,
      metronomeTick: 0,
      currentSubdivision: 1,
      mutedIndicators: [],
      bpmError: false,
    };
    this._start = this._start.bind(this);
    this._stop = this._stop.bind(this);
    this._setBpm = this._setBpm.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._setSubdivision = this._setSubdivision.bind(this);
    this._handleLongPress = this._handleLongPress.bind(this);
    this._clearLongPressInterval = this._clearLongPressInterval.bind(this);
  }

  componentDidMount() {
    this.metronomeTick = document.getElementById('metronome-tick');
    this.metronomeTock = document.getElementById('metronome-tock');
    if ('serviceWorker' in navigator) {
      // https://medium.com/@anatomic/using-a-service-worker-with-next-js-460e0168a60a
      navigator.serviceWorker
        .register('/files/metronome.worker.js')
        .then((resp) => {
          this.myWorker = new Worker(resp?.active?.scriptURL);
          this.myWorker.onmessage = this._onMessage;
        })
        .catch((err) => {
          console.warn('Service worker registration failed', err);
        });
    } else {
      console.warn('Service worker not supported');
    }
  }

  componentWillUnmount() {
    this.myWorker?.terminate();
  }

  render() {
    const { currentBpm, bpmError, currentSubdivision, isMetronomeStarted } =
      this.state;
    return (
      <section id="metronome-container" className="col-sm-12">
        <h2 id="metronome-title" className="section-header">
          Metronome
        </h2>
        <p className="section-description">
          <PortfolioQuote>
            This metronome (and the larger website) is built with{' '}
            <a
              href="libs/components/src/portfolio/metronome.jsx"
              target="_blank"
              rel="noreferrer">
              React
            </a>{' '}
            and JavaScript and employs{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers"
              target="_blank"
              rel="noreferrer">
              Web Workers
            </a>{' '}
            and a self-correcting timer. The range of recorded variance is
            &#177;2 milliseconds off of true time.
            <br />
            <br />
            To use the metronome, select your beats per minute using the input
            box in the top left corner and your note subdivision using the
            dropdown in the top right. Then press the "Start" button to begin
            the count. Left click on any subdivision to mute the beat which is
            indicated by a black icon. Left click again on the black icon to
            unmute it and remove the black indicator.
          </PortfolioQuote>
        </p>
        <div className="border-frame">
          <div className="row">
            <div className="col-sm-12 col-md-6 metronome-controls-container">
              <p>
                <label htmlFor="metronome-bpm-input">Beats Per Minute</label>
              </p>
              <button
                onTouchStart={() => {
                  this._handleLongPress(false);
                }}
                onTouchEnd={() => {
                  this._clearLongPressInterval(false);
                }}
                onMouseDown={() => {
                  this._handleLongPress(false);
                }}
                onMouseUp={() => {
                  this._clearLongPressInterval(false);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                className="small-button">
                -
              </button>
              <input
                id="metronome-bpm-input"
                type="number"
                value={currentBpm || ''}
                onChange={(e) => this._getBpmFromInput(e)}
                max={this.maxValue}
                min={this.minValue}
                className={classNames('input', { error: bpmError })}
              />
              <button
                onTouchStart={() => {
                  this._handleLongPress(true);
                }}
                onTouchEnd={() => {
                  this._clearLongPressInterval(true);
                }}
                onMouseDown={() => {
                  this._handleLongPress(true);
                }}
                onMouseUp={() => {
                  this._clearLongPressInterval(true);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  return false;
                }}
                className="small-button">
                +
              </button>
              {bpmError ? (
                <p className="error">Please enter a value between 40 and 220</p>
              ) : null}
            </div>
            <div className="col-sm-12 col-md-6 metronome-controls-container">
              <p>Subdivision</p>
              <div className="list-item-selector row">
                {this.availableSubdivisions.map((subdivision, index) => {
                  return (
                    <a
                      key={index}
                      className={classNames('col-sm-6 list-item', {
                        selected: subdivision.value === currentSubdivision,
                      })}
                      onClick={() => this._setSubdivision(subdivision)}>
                      {subdivision.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div id="metronome-indicators-container" className="row">
            {this._getMetronomeIndicators()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <button
              onClick={this._start}
              className={classNames('button', {
                disabled: isMetronomeStarted || bpmError,
              })}>
              Start
            </button>
          </div>
          <div className="col-sm-6">
            <button
              onClick={this._stop}
              className={classNames('button', {
                disabled: !isMetronomeStarted,
              })}>
              Stop
            </button>
          </div>
        </div>
        <AnalyticsButton
          href="https://github.com/michael-brittlebank/michaelbrittlebank.com/blob/master/src/portfolio/metronome.js"
          action="metronomeButtonClick"
        />
        <audio id="metronome-tick" src={'/files/tick.mp3'} preload="auto" />
        <audio id="metronome-tock" src={'/files/tock.mp3'} preload="auto" />
      </section>
    );
  }

  _getMetronomeIndicators() {
    const { currentSubdivision, metronomeTick, mutedIndicators } = this.state;
    const indicators = [];
    if (currentSubdivision === 1) {
      indicators.push(
        <div
          key={0}
          className="metronome-indicator-container"
          onClick={() => this._silenceIndicator(0)}>
          <div className="metronome-indicator opaque" />
          <div
            className={classNames('metronome-indicator center-absolute', {
              active: metronomeTick % 2 !== 0,
              silent: mutedIndicators.indexOf(0) !== -1,
            })}>
            &nbsp;
          </div>
          <div
            className={classNames('metronome-indicator center-absolute', {
              active: metronomeTick % 2 === 0,
              silent: mutedIndicators.indexOf(0) !== -1,
            })}>
            &nbsp;
          </div>
          <span className="metronome-indicator-number">1</span>
        </div>,
      );
    } else {
      for (let i = 0; i < currentSubdivision; i++) {
        indicators.push(
          <div
            key={i}
            className="metronome-indicator-container"
            onClick={() => this._silenceIndicator(i)}>
            <div
              className={classNames('metronome-indicator', {
                active:
                  currentSubdivision === 1
                    ? metronomeTick % 2 === 0
                    : metronomeTick % currentSubdivision === i,
                silent: mutedIndicators.indexOf(i) !== -1,
              })}>
              &nbsp;
            </div>
            <span className="metronome-indicator-number">{i + 1}</span>
          </div>,
        );
      }
    }
    return indicators;
  }

  _start() {
    const { isMetronomeStarted } = this.state;
    if (!isMetronomeStarted) {
      AnalyticsService.event({
        action: 'metronomeStartButtonClick',
      });
      this.setState({
        isMetronomeStarted: true,
      });
      this._postWorkerMessage();
    }
  }

  _stop() {
    const { isMetronomeStarted } = this.state;
    if (isMetronomeStarted) {
      AnalyticsService.event({
        action: 'metronomeStopButtonClick',
      });
      this.setState({
        isMetronomeStarted: false,
      });
      this._postWorkerMessage(0);
    }
  }

  _getBpmFromInput(e) {
    if (e.target.value.length > 0) {
      this._setBpm(parseInt(e.target.value, 10));
    } else {
      this._setBpm(undefined);
    }
  }

  _setBpm(newBpmValue) {
    const { isMetronomeStarted } = this.state;
    let modifiedState = {};
    if (newBpmValue) {
      if (newBpmValue > this.maxValue) {
        // set to max bpm
        modifiedState = {
          bpmError: true,
          currentBpm: newBpmValue,
        };
      } else if (newBpmValue < this.minValue) {
        // set to min bpm
        modifiedState = {
          bpmError: true,
          currentBpm: newBpmValue,
        };
      } else {
        // set to new bpm
        modifiedState = {
          bpmError: false,
          currentBpm: newBpmValue,
        };
      }
    } else {
      // allow empty inputs
      modifiedState = {
        bpmError: true,
        currentBpm: undefined,
      };
    }
    this.setState(modifiedState);
    clearTimeout(this.setBpmDebounceTimeout);
    this.setBpmDebounceTimeout = setTimeout(
      // lodash debounce was not getting triggered hence custom debounce
      () => {
        const { currentBpm, bpmError } = modifiedState;
        if (isMetronomeStarted && !!currentBpm && !bpmError) {
          this._postWorkerMessage();
        }
      },
      500,
    );
  }

  _onMessage(e) {
    if (
      e.data.tick % this.state.currentSubdivision === 0 &&
      this.state.mutedIndicators.indexOf(0) === -1
    ) {
      // tick
      this.metronomeTick.currentTime = 0;
      this.metronomeTick.play();
    } else {
      if (
        this.state.mutedIndicators.indexOf(
          e.data.tick % this.state.currentSubdivision,
        ) === -1
      ) {
        // tock
        this.metronomeTock.currentTime = 0;
        this.metronomeTock.play();
      }
    }
    this.setState({
      metronomeTick: parseInt(e.data.tick, 10),
    });
  }

  _setSubdivision(subdivison) {
    const newSubdivision = subdivison.value;
    if (this.state.isMetronomeStarted && !!this.state.currentBpm) {
      this._postWorkerMessage(undefined, newSubdivision);
    }
    this.setState({
      currentSubdivision: newSubdivision,
    });
  }

  _postWorkerMessage(
    bpm = this.state.currentBpm,
    subdivision = this.state.currentSubdivision,
  ) {
    this.myWorker.postMessage({
      bpm: bpm,
      subdivision: subdivision,
    });
  }

  _silenceIndicator(indicatorIndex) {
    const mutedIndicators = this.state.mutedIndicators;
    const indexInArray = mutedIndicators.indexOf(indicatorIndex);
    if (indexInArray === -1) {
      // add to array
      mutedIndicators.push(indicatorIndex);
    } else {
      // remove from array
      mutedIndicators.splice(indexInArray, 1);
    }
    this.setState({
      mutedIndicators: mutedIndicators,
    });
  }

  _handleLongPress(increaseBpm) {
    if (increaseBpm) {
      if (!this.longPressInterval) {
        this.longPressInterval = setInterval(() => {
          this._setBpm(this.state.currentBpm + 1);
        }, 200);
      }
    } else {
      if (!this.longPressInterval) {
        this.longPressInterval = setInterval(() => {
          this._setBpm(this.state.currentBpm - 1);
        }, 200);
      }
    }
  }

  _clearLongPressInterval(increaseBpm) {
    clearInterval(this.longPressInterval);
    this.longPressInterval = undefined;
    if (increaseBpm) {
      this._setBpm(this.state.currentBpm + 1);
    } else {
      this._setBpm(this.state.currentBpm - 1);
    }
  }
}
