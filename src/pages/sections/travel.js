import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import UtilService from '../../services/util.service';
import TravelService from '../../services/travel.service';
import Spacer from '../components/spacer';

class Travel extends React.PureComponent {
  constructor(props) {
    super(props);
    const travelMarkers = TravelService.availableTravelMarkers;
    const randomIndex = UtilService.getRandomIntInclusive(
      0,
      travelMarkers.length,
    );
    this.state = {
      activeMarker: null,
      randomIndex,
      travelMarkers,
    };
    this._onMarkerClick = this._onMarkerClick.bind(this);
    this._onInfoWindowClose = this._onInfoWindowClose.bind(this);
  }

  _onMarkerClick(props, marker, e) {
    this.setState({ activeMarker: marker });
  }

  _onInfoWindowClose() {
    this.setState({ activeMarker: null });
  }

  render() {
    const { google } = this.props;
    const { randomIndex, activeMarker, travelMarkers } = this.state;
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
            <Map
              google={google}
              zoom={4}
              maxZoom={8}
              minZoom={3}
              mapTypeControl={false}
              streetViewControl={false}
              fullscreenControl={false}
              initialCenter={{
                lat: travelMarkers[randomIndex].lat,
                lng: travelMarkers[randomIndex].lng,
              }}>
              {travelMarkers.map((mapMarker, index) => {
                return (
                  <Marker
                    key={index}
                    onClick={this._onMarkerClick}
                    name={mapMarker.title}
                    position={{ lat: mapMarker.lat, lng: mapMarker.lng }}
                  />
                );
              })}
              <InfoWindow
                marker={activeMarker}
                visible={!!activeMarker}
                onClose={this._onInfoWindowClose}>
                <div>
                  <p className="no-margin">
                    {activeMarker ? activeMarker.name : ''}
                  </p>
                </div>
              </InfoWindow>
            </Map>
          </section>
        </div>
        <Spacer color="orange" />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
})(Travel);
