import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { PureComponent } from 'react';
import { DataService, UtilService } from '@michaelbrittlebank/services';

class BaseLocationMap extends PureComponent {
  constructor(props) {
    super(props);
    const travelMarkers = DataService.getTravelMarkers();
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
      <Map
        google={google}
        zoom={4}
        maxZoom={9}
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
            <p className="no-margin">{activeMarker ? activeMarker.name : ''}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export const LocationMapWrapper = GoogleApiWrapper({
  apiKey: process.env.NX_GOOGLE_MAPS_API_KEY,
})(BaseLocationMap);
