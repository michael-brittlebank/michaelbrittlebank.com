import * as React from 'react';
import {MapMarkerInterface} from '../../interfaces/mapMarker.interface';
import {TravelService} from '../../services/travel.service';
import '../../sass/components/pages/travel.css'
import { Helmet } from 'react-helmet';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as _ from 'lodash';

interface State {
    activeMarker: any,
}

interface Props {
    google: any;
}

export class Travel extends React.Component<Props, State> {

    private travelMarkers: MapMarkerInterface[] = TravelService.getAvailableTravelMarkers();

    constructor(props: Props) {
        super(props);
        this.state = {
            activeMarker: undefined
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }

    render() {
        const randomIndex: number = _.random(0, this.travelMarkers.length);
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf | Travel</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 className="page-title">Travel</h1>
                </div>
                <section id="travel-map-container" className="col-sm-12'">
                    <Map
                        google={this.props.google}
                        zoom={4}
                        maxZoom={8}
                        minZoom={3}
                        mapTypeControl={false}
                        streetViewControl={false}
                        fullscreenControl={false}
                        initialCenter={{
                            lat: this.travelMarkers[randomIndex].lat,
                            lng: this.travelMarkers[randomIndex].lng
                        }}
                    >
                        {
                            _.map(this.travelMarkers, (mapMarker: MapMarkerInterface, index: number) => {
                                return (
                                    <Marker
                                        key={index}
                                        onClick={this.onMarkerClick}
                                        name={mapMarker.title}
                                        position={{lat: mapMarker.lat, lng: mapMarker.lng}}
                                    />
                                )
                            })
                        }
                        <InfoWindow
                            marker={this.state.activeMarker}
                            visible={!!this.state.activeMarker}
                            onClose={this.onInfoWindowClose}
                        >
                            <div>
                                <p className="no-margin">{this.state.activeMarker ? this.state.activeMarker.name : ''}</p>
                            </div>
                        </InfoWindow>
                    </Map>
                </section>
            </div>
        )
    }

    private onMarkerClick(props: any, marker: any, e: any) {
        this.setState({
            activeMarker: marker,
        });
    }

    private onInfoWindowClose() {
        this.setState({
            activeMarker: undefined
        });
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS || '')
})(Travel)