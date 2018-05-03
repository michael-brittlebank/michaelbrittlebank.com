import * as React from 'react';
import Hauptstimme from './hauptstimme';
import ReadingList from './reading-list';

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
                    {/*reading list*/}
                    <ReadingList/>
                </section>
            </div>
        )
    }
}