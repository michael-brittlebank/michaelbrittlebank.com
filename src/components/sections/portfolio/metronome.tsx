import * as React from 'react';
import * as workerPath from 'file-loader?name=[name].js!./partials/metronome-worker';

export default class Metronome extends React.Component {

    private myWorker = new Worker(workerPath);

    componentDidMount() {
        const element:any = document.getElementById('metronome-click');
        this.myWorker.onmessage = function(e: any): void {
            element.currentTime = 0;
            element.play();
            console.log('Message received from worker', e);
        }
    }

    render() {
        return (
            <section id="metronome-container" className="col-sm-12">
                <h2 id="metronome-title" className="section-header">Metronome</h2>
                <a onClick={(e) => this.play(e)}>
                    click me
                </a>
                <audio id="metronome-click" src="/assets/click.mp3" preload="auto"/>
            </section>
        );
    }

    private play(e: React.MouseEvent<HTMLAnchorElement>): void {
        e.preventDefault();
        const interval: number = 60/120*1000;
        this.myWorker.postMessage({interval: interval});
        console.log('Message posted to worker');
    }
}
