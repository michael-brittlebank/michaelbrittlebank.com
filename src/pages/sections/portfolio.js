import dynamic from 'next/dynamic'

import ReadingList from "../portfolio/reading-list";

const DynamicHauptstimme = dynamic(
  () => import('../portfolio/hauptstimme'),
  { ssr: false }
)

const DynamicMetronome = dynamic(
  () => import('../portfolio/metronome'),
  { ssr: false }
)

export default function Portfolio(){
  return (
    <div id="portfolio-container" className="grid-container row">
     <div className="col-sm-12">
      <h1 id="portfolio-title" className="page-title">Portfolio</h1>
     </div>
     <section id="portfolio-body" className="col-sm-12 row">
      <DynamicHauptstimme/>
      <DynamicMetronome/>
      <ReadingList/>
     </section>
    </div>
  )
}