import { ReadingList, Metronome, Hauptstimme, Bubbles } from '../portfolio';

export function Portfolio() {
  return (
    <div id="portfolio-container" className="grid-container row">
      <div className="col-sm-12">
        <h1 id="portfolio-title" className="page-title">
          Portfolio
        </h1>
      </div>
      <section id="portfolio-body" className="col-sm-12 row">
        <Hauptstimme />
        <Metronome />
        <Bubbles />
        <ReadingList />
      </section>
    </div>
  );
}
