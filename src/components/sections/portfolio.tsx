import * as React from 'react';
import Hauptstimme from './portfolio/hauptstimme';
import ReadingList from './portfolio/reading-list';
import Metronome from './portfolio/metronome';

export default class Portfolio extends React.Component {
    render() {
        return (
            <div id="portfolio-container" className="grid-container row">
                <div className="col-sm-12">
                    <h1 id="portfolio-title" className="page-title">Portfolio</h1>
                </div>
                <section id="portfolio-body" className="col-sm-12 row">
                    {/*hauptstimme*/}
                    <Hauptstimme/>
                    {/*metronome*/}
                    <Metronome/>
                    {/*reading list*/}
                    <ReadingList/>
                </section>
            </div>
        )
    }
}