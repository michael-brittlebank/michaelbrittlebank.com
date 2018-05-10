import * as React from 'react';
import * as workerPath from 'file-loader?name=[name].js!./partials/metronome-worker';
import * as classNames from 'classnames';

interface State {
    isMetronomeStarted: boolean;
}

export default class Metronome extends React.Component<any, State> {

    private myWorker = new Worker(workerPath);

    constructor(props: any) {
        super(props);
        this.state = {
            isMetronomeStarted: false
        };
        this._start = this._start.bind(this);
        this._stop = this._stop.bind(this);
    }

    componentDidMount() {
        const element:any = document.getElementById('metronome-click');
        this.myWorker.onmessage = function(e: any): void {
            element.currentTime = 0;
            element.play();
        }
    }

    render() {
        return (
            <section id="metronome-container" className="col-sm-12">
                <h2 id="metronome-title" className="section-header">Metronome</h2>
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

    private _start(e: React.MouseEvent<HTMLButtonElement>): void {
        e.preventDefault();
        if (!this.state.isMetronomeStarted) {
            const interval: number = 60 / 120 * 1000;
            this.setState({
                isMetronomeStarted: true
            });
            this.myWorker.postMessage({interval: interval});
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
}
