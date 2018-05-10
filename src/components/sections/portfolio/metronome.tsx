import * as React from 'react';
import * as workerPath from 'file-loader?name=[name].js!./partials/metronome-worker';
import * as classNames from 'classnames';
import '../../../sass/components/sections/metronome.css'

interface State {
    isMetronomeStarted: boolean;
    currentBpm: number;
    metronomeTick: number;
}

export default class Metronome extends React.Component<any, State> {

    private myWorker: any = new Worker(workerPath);
    private maxValue: number = 220;
    private minValue: number = 40;
    private setBpmDebounceTimeout: any; // https://github.com/Microsoft/TypeScript/issues/842
    private metronomeElement: any;

    constructor(props: any) {
        super(props);
        this.state = {
            isMetronomeStarted: false,
            currentBpm: 120,
            metronomeTick: 0
        };
        this._start = this._start.bind(this);
        this._stop = this._stop.bind(this);
        this._setBpm = this._setBpm.bind(this);
        this._onMessage = this._onMessage.bind(this);
    }

    componentDidMount() {
        this.metronomeElement = document.getElementById('metronome-click');
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
                        <select>
                            <option>2/4</option>
                            <option>3/4</option>
                            <option selected={true}>4/4</option>
                            <option>6/8</option>
                            <option>9/8</option>
                            <option>12/8</option>
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
                <audio id="metronome-click" src="/assets/click.mp3" preload="auto"/>
            </section>
        );
    }

    private _getMetronomeIndicators(): any {
        const indicators: any = [];
        for(let i = 0; i < 4; i++) {
            indicators.push(
                <div className="metronome-indicator-container" key={i}>
                    <div
                        className={classNames('metronome-indicator', {
                            'active': this.state.metronomeTick % 4 === i
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
            this.myWorker.postMessage({interval: this.state.currentBpm});
        }
    }

    private _stop(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (this.state.isMetronomeStarted) {
            this.setState({
                isMetronomeStarted: false
            });
            this.myWorker.postMessage({interval: 0});
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
                    this.myWorker.postMessage({interval: this.state.currentBpm});
                }
            },
            500
        );
    }

    private _onMessage(e: MessageEvent): void {
        this.metronomeElement.currentTime = 0;
        this.metronomeElement.play();
        this.setState({
            metronomeTick: parseInt(e.data.tick, 10)
        });
    }
}
