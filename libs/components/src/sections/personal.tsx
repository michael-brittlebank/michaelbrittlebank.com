import {
  Bubbles,
  Hauptstimme,
  Metronome,
  ReadingList,
  Renovation,
} from '../portfolio';

export function Personal() {
  return (
    <div id="personal-container" className="grid-container row">
      <div className="col-sm-12">
        <h1 id="portfolio-title" className="page-title">
          Personal
        </h1>
      </div>
      <section id="portfolio-body" className="col-sm-12 row">
        <ReadingList />
        <Renovation />
        <Hauptstimme />
        <Bubbles />
        <Metronome />
      </section>
    </div>
  );
}
