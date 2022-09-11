import { Spacer } from '../shared';
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
      <div className="full-screen-grid-container row">
        <div id="travel-quote">
          <p>
            {String.fromCharCode(8220)}Go n-éirí an bóthar leat.
            {String.fromCharCode(8221)}
          </p>
          <p>{String.fromCharCode(8212)}</p>
          <p>May you have a successful journey.</p>
        </div>
        <section id="travel-map-container" className="col-sm-12 no-padding">
          <LocationMapWrapper />
        </section>
      </div>
      <Spacer color="orange" />
    </div>
  );
}
