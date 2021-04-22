import ReadingList from "../portfolio/reading-list";
import Metronome from "../portfolio/metronome";
import Hauptstimme from "../portfolio/hauptstimme";

export default function Portfolio(){
  return (
    <div id="portfolio-container" className="grid-container row">
     <div className="col-sm-12">
      <h1 id="portfolio-title" className="page-title">Portfolio</h1>
     </div>
     <section id="portfolio-body" className="col-sm-12 row">
     <Hauptstimme/>
      <Metronome/>
      <ReadingList/>
     </section>
    </div>
  )
}