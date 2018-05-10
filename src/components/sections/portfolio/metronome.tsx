import * as React from 'react';
import * as workerPath from 'file-loader?name=[name].js!./partials/metronome-worker';
import * as classNames from 'classnames';
import '../../../sass/components/sections/metronome.css'

interface State {
    isMetronomeStarted: boolean;
    currentBpm: number;
    metronomeTick: number;
    currentSubdivision: number;
    mutedIndicators: number[];
}

export default class Metronome extends React.Component<any, State> {

    private myWorker: any = new Worker(workerPath);
    private maxValue: number = 220;
    private minValue: number = 40;
    private setBpmDebounceTimeout: any; // https://github.com/Microsoft/TypeScript/issues/842
    private metronomeTick: any;
    private metronomeTock: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isMetronomeStarted: false,
            currentBpm: 100,
            metronomeTick: 0,
            currentSubdivision: 1,
            mutedIndicators: []
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
                    Range of error is +-2 milliseconds using a Web Worker and self-correcting timer.
                </p>
                <div className="row">
                    <div className="col-sm-6 text-center">
                        <input
                            type="number"
                            value={this.state.currentBpm || ''}
                            onChange={(e) => this._setBpm(e)}
                            max={this.maxValue}
                            min={this.minValue}
                            className="input"
                        />
                    </div>
                    <div className="col-sm-6 text-center">
                        <select onChange={(e) => this._setSubdivision(e)} value={this.state.currentSubdivision}>
                            <option value="1">Whole Note</option>
                            <option value="2">Half Note</option>
                            <option value="3">Triplet Note</option>
                            <option value="4">Quarter Note</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    {
                        this._getMetronomeIndicators()
                    }
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <button
                            onClick={(e) => this._start(e)}
                            className={classNames('button', {
                                'disabled': this.state.isMetronomeStarted
                            })}
                        >
                            <span>
                                Start
                            </span>
                        </button>
                    </div>
                    <div className="col-sm-6">
                        <button
                            onClick={(e) => this._stop(e)}
                            className={classNames('button', {
                                'disabled': !this.state.isMetronomeStarted
                            })}
                        >
                            <span>
                                Stop
                            </span>
                        </button>
                    </div>
                </div>
                <audio id="metronome-tick" src="/assets/tick.mp3" preload="auto"/>
                <audio id="metronome-tock" src="/assets/tock.mp3" preload="auto"/>
            </section>
        );
    }

    private _getMetronomeIndicators(): any {
        const indicators: any = [];
        for(let i = 0; i < this.state.currentSubdivision; i++) {
            indicators.push(
                <div className="metronome-indicator-container" key={i} onClick={(e) => this._silenceIndicator(e, i)}>
                    <div
                        className={classNames('metronome-indicator', {
                            'active': this.state.metronomeTick % this.state.currentSubdivision === i,
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

    private _setBpm(e: React.ChangeEvent<HTMLInputElement>): void {
        if (e.target.value.length > 0) {
            const newBpmValue: number = parseInt(e.target.value, 10);
            if (newBpmValue > this.maxValue) {
                // set to max bpm
                this.setState({
                    currentBpm: this.maxValue
                });
            } else if (newBpmValue < this.minValue) {
                // set to min bpm
                this.setState({
                    currentBpm: this.minValue
                });
            } else {
                // set to new bpm
                this.setState({
                    currentBpm: newBpmValue
                });
            }
        } else {
            // allow empty inputs
            this.setState({
                currentBpm: undefined
            });
        }
        clearTimeout(this.setBpmDebounceTimeout);
        this.setBpmDebounceTimeout = setTimeout(
            // lodash debounce was not getting triggered hence custom debounce
            () => {
                if (this.state.isMetronomeStarted && !!this.state.currentBpm) {
                    this._postWorkerMessage();
                }
            },
            500
        );
    }

    private _onMessage(e: MessageEvent): void {
        if (e.data.tick % this.state.currentSubdivision === 0 && this.state.mutedIndicators.indexOf(0) === -1) {
            // tock
            this.metronomeTock.currentTime = 0;
            this.metronomeTock.play();
        } else {
            if (this.state.mutedIndicators.indexOf(e.data.tick % this.state.currentSubdivision) === -1) {
                // tick
                this.metronomeTick.currentTime = 0;
                this.metronomeTick.play();
            }
        }
        this.setState({
            metronomeTick: parseInt(e.data.tick, 10)
        });
    }

    private _setSubdivision(e: React.ChangeEvent<HTMLSelectElement>): void {
        const newSubdivision: number = parseInt((e.target as HTMLSelectElement).value, 10);
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
