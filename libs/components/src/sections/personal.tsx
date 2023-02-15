import {
  Bubbles,
  Hauptstimme,
  Metronome,
  ReadingList,
  Renovation,
} from '../portfolio';
import { Quote } from '../shared';

export function Personal() {
  return (
    <div id="personal-container" className="grid-container row">
      <div className="col-sm-12">
        <h1 id="portfolio-title" className="page-title">
          Personal
        </h1>
      </div>
      <div className="col-sm-12 row">
        <Quote
          message="Plans are nothing, planning is everything."
          author="Dwight D. Eisenhower"
        />
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
