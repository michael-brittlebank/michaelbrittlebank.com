import { Quote, Spacer } from '../shared';
import { LocationMapWrapper } from './map';

export function Travel() {
  return (
    <div id="travel-container">
      <div className="grid-container row">
        <div className="col-sm-12">
          <h1 id="travel-title" className="page-title">
            Travel
          </h1>
        </div>
      </div>
      <div id="travel-quote-container" className="grid-container row">
        <Quote
          message="Go n-éirí an bóthar leat."
          author="May you have a successful journey."
        />
        <section id="travel-map-container" className="col-sm-12 no-padding">
          <LocationMapWrapper />
        </section>
      </div>
      <Spacer color="orange" />
    </div>
  );
}
