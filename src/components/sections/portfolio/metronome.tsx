import * as React from 'react';
import * as workerPath from 'file-loader?name=[name].js!./partials/metronome-worker';
import * as classNames from 'classnames';
import '../../../sass/components/sections/metronome.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faGithub from '@fortawesome/fontawesome-free-brands/faGithub'
import map = require('lodash/map')

interface State {
    isMetronomeStarted: boolean;
    currentBpm: number;
    metronomeTick: number;
    currentSubdivision: number;
    mutedIndicators: number[];
    bpmError: boolean;
}

interface SubdivisionInterface {
    label: string;
    value: number;
}

export default class Metronome extends React.Component<any, State> {

    private myWorker: any = new Worker(workerPath);
    private maxValue: number = 220;
    private minValue: number = 40;
    private setBpmDebounceTimeout: any; // https://github.com/Microsoft/TypeScript/issues/842
    private metronomeTick: any;
    private metronomeTock: any;
    private availableSubdivisions: SubdivisionInterface[] = [
        {
            label: 'Whole Note',
            value: 1
        },
        {
            label: 'Half Note',
            value: 2
        },
        {
            label: 'Triplet Note',
            value: 3
        },
        {
            label: 'Quarter Note',
            value: 4
        }
    ];

    constructor(props: any) {
        super(props);
        this.state = {
            isMetronomeStarted: false,
            currentBpm: 100,
            metronomeTick: 0,
            currentSubdivision: 1,
            mutedIndicators: [],
            bpmError: false
        };
        this._start = this._start.bind(this);
        this._stop = this._stop.bind(this);
        this._setBpm = this._setBpm.bind(this);
        this._onMessage = this._onMessage.bind(this);
        this._setSubdivision = this._setSubdivision.bind(this);
    }

    componentDidMount() {
        this.metronomeTick = document.getElementById('metronome-tick');
        this.metronomeTock = document.getElementById('metronome-tock');
        this.myWorker.onmessage = this._onMessage;
    }

    componentWillUnmount() {
        this.myWorker.terminate();
    }

    render() {
        return (
            <section id="metronome-container" className="col-sm-12">
                <h2 id="metronome-title" className="section-header">Metronome</h2>
                <p>
                    This metronome (and the larger website) is built with <a href="https://reactjs.org/" target="_blank">React</a> and JavaScript and employs <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers" target="_blank">Web Workers</a> and self-correcting timer. The range of recorded variance is &#177;2 milliseconds off of true time.
                </p>
                <p>
                    To use the metronome, select your beats per minute using the input box in the top left corner and your note subdivision using the dropdown in the top right. Then press the "Start" button to begin the count. Left click on any subdivision to mute the beat which is indicated by a black icon. Left click again on the black icon to unmute it and remove the black indicator.
                </p>
                <div className="row">
                    <div className="col-sm-12 col-md-6 metronome-controls-container">
                        <p>
                            <label htmlFor="metronome-bpm-input">
                                Beats Per Minute
                            </label>
                        </p>
                        <button
                            onClick={(e) => {e.preventDefault(); this._setBpm(this.state.currentBpm-1)}}
                            className="small-button"
                        >
                            -
                        </button>
                        <input
                            id="metronome-bpm-input"
                            type="number"
                            value={this.state.currentBpm || ''}
                            onChange={(e) => this._getBpmFromInput(e)}
                            max={this.maxValue}
                            min={this.minValue}
                            className={classNames('input', {'error': this.state.bpmError})}
                        />
                        <button
                            onClick={(e) => {e.preventDefault(); this._setBpm(this.state.currentBpm+1)}}
                            className="small-button"
                        >
                            +
                        </button>
                        {
                            this.state.bpmError ? <p className="error">Please enter a value between 40 and 220</p> : null
                        }
                    </div>
                    <div className="col-sm-12 col-md-6 metronome-controls-container">
                        <p>
                            Subdivision
                        </p>
                        <div className="list-item-selector row">
                            {map(this.availableSubdivisions, (subdivision: SubdivisionInterface, index: number) => {
                                return (
                                    <a
                                        key={index}
                                        className={classNames('col-sm-6 list-item', {'selected': subdivision.value === this.state.currentSubdivision})}
                                        onClick={(e) => this._setSubdivision(e, subdivision)}
                                    >
                                        {subdivision.label}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div id="metronome-indicators-container" className="row">
                    {
                        this._getMetronomeIndicators()
                    }
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <button
                            onClick={(e) => this._start(e)}
                            className={classNames('button', {
                                'disabled': this.state.isMetronomeStarted || this.state.bpmError
                            })}
                        >
                            Start
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button
                            onClick={(e) => this._stop(e)}
                            className={classNames('button', {
                                'disabled': !this.state.isMetronomeStarted
                            })}
                        >
                            Stop
                        </button>
                    </div>
                </div>
                <a href="https://github.com/mike-stumpf/mikestumpf.com/blob/master/src/components/sections/portfolio/metronome.tsx" className="button" target="_blank">
                    View Code&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faGithub} className="fa"/>
                </a>
                <audio id="metronome-tick" src="/assets/tick.mp3" preload="auto"/>
                <audio id="metronome-tock" src="/assets/tock.mp3" preload="auto"/>
            </section>
        );
    }

    private _getMetronomeIndicators(): any[] {
        const indicators: any[] = [];
        if (this.state.currentSubdivision === 1) {
            indicators.push(
                <div
                    key={0}
                    className="metronome-indicator-container"
                    onClick={(e) => this._silenceIndicator(e, 0)}
                >
                    <div className="metronome-indicator opaque"/>
                    <div
                        className={classNames('metronome-indicator center-absolute', {
                            'active': this.state.metronomeTick % 2 !== 0,
                            'silent': this.state.mutedIndicators.indexOf(0) !== -1
                        })}
                    >
                        &nbsp;
                    </div>
                    <div
                        className={classNames('metronome-indicator center-absolute', {
                            'active': this.state.metronomeTick % 2 === 0,
                            'silent': this.state.mutedIndicators.indexOf(0) !== -1
                        })}
                    >
                        &nbsp;
                    </div>
                    <span className="metronome-indicator-number">
                    1
                    </span>
                </div>
            )
        } else {
            for (let i = 0; i < this.state.currentSubdivision; i++) {
                indicators.push(
                    <div
                        key={i}
                        className="metronome-indicator-container"
                        onClick={(e) => this._silenceIndicator(e, i)}
                    >
                        <div
                            className={classNames('metronome-indicator', {
                                'active': this.state.currentSubdivision === 1 ? this.state.metronomeTick % 2 === 0 : this.state.metronomeTick % this.state.currentSubdivision === i,
                                'silent': this.state.mutedIndicators.indexOf(i) !== -1
                            })}
                        >
                            &nbsp;
                        </div>
                        <span className="metronome-indicator-number">
                    {i + 1}
                    </span>
                    </div>
                )
            }
        }
        return indicators;
    }

    private _start(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (!this.state.isMetronomeStarted) {
            this.setState({
                isMetronomeStarted: true
            });
            this._postWorkerMessage();
        }
    }

    private _stop(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (this.state.isMetronomeStarted) {
            this.setState({
                isMetronomeStarted: false
            });
            this._postWorkerMessage(0);
        }
    }

    private _getBpmFromInput(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.value.length > 0) {
            this._setBpm(parseInt(e.target.value, 10));
        } else {
            this._setBpm(undefined);
        }
    }

    private _setBpm(newBpmValue: number): void {
        if (!!newBpmValue) {
            if (newBpmValue > this.maxValue) {
                // set to max bpm
                this.setState({
                    bpmError: true,
                    currentBpm: newBpmValue
                });
            } else if (newBpmValue < this.minValue) {
                // set to min bpm
                this.setState({
                    bpmError: true,
                    currentBpm: newBpmValue
                });
            } else {
                // set to new bpm
                this.setState({
                    bpmError: false,
                    currentBpm: newBpmValue
                });
            }
        } else {
            // allow empty inputs
            this.setState({
                bpmError: true,
                currentBpm: undefined
            });
        }
        clearTimeout(this.setBpmDebounceTimeout);
        this.setBpmDebounceTimeout = setTimeout(
            // lodash debounce was not getting triggered hence custom debounce
            () => {
                if (this.state.isMetronomeStarted && !!this.state.currentBpm && !this.state.bpmError) {
                    this._postWorkerMessage();
                }
            },
            500
        );
    }

    private _onMessage(e: MessageEvent): void {
        if (e.data.tick % this.state.currentSubdivision === 0 && this.state.mutedIndicators.indexOf(0) === -1) {
            // tick
            this.metronomeTick.currentTime = 0;
            this.metronomeTick.play();
        } else {
            if (this.state.mutedIndicators.indexOf(e.data.tick % this.state.currentSubdivision) === -1) {
                // tock
                this.metronomeTock.currentTime = 0;
                this.metronomeTock.play();
            }
        }
        this.setState({
            metronomeTick: parseInt(e.data.tick, 10)
        });
    }

    private _setSubdivision(e: React.MouseEvent<HTMLAnchorElement>, subdivison: SubdivisionInterface): void {
        e.preventDefault();
        const newSubdivision: number = subdivison.value;
        if (this.state.isMetronomeStarted && !!this.state.currentBpm) {
            this._postWorkerMessage(undefined, newSubdivision);
        }
        this.setState({
            currentSubdivision: newSubdivision
        });
    }

    private _postWorkerMessage(bpm: number = this.state.currentBpm, subdivision: number = this.state.currentSubdivision): void {
        this.myWorker.postMessage({
            bpm: bpm,
            subdivision: subdivision
        });
    }

    private _silenceIndicator(e: React.MouseEvent<HTMLDivElement>, indicatorIndex: number): void {
        e.preventDefault();
        const mutedIndicators: number[] = this.state.mutedIndicators;
        const indexInArray: number = mutedIndicators.indexOf(indicatorIndex);
        if (indexInArray === -1) {
            // add to array
            mutedIndicators.push(indicatorIndex);
        } else {
            // remove from array
            mutedIndicators.splice(indexInArray, 1);
        }
        this.setState({
            mutedIndicators: mutedIndicators
        });
    }
}
