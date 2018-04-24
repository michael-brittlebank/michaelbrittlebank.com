import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/home.css'
import {MapMarkerInterface} from '../../interfaces/mapMarker.interface';
import {TravelService} from '../../services/travel.service';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as _ from 'lodash';
import ReadingList from '../sections/reading-list';
import Hauptstimme from '../sections/hauptstimme';
import Resume from '../sections/resume';
import * as pic from '../../assets/face.jpg';

interface State {
    activeMarker: any,
}

interface Props {
    google: any;
}

export class Home extends React.Component<Props, State> {

    private travelMarkers: MapMarkerInterface[] = TravelService.getAvailableTravelMarkers();

    constructor(props: Props) {
        super(props);
        this.state = {
            activeMarker: undefined
        };
        this._onMarkerClick = this._onMarkerClick.bind(this);
        this._onInfoWindowClose = this._onInfoWindowClose.bind(this);
    }

    render() {
        const randomIndex: number = _.random(0, this.travelMarkers.length);
        return (
            <main className="page-container">
                <Helmet>
                    <title>Mike Stumpf</title>
                </Helmet>
                <div id="home-container">
                    <div className="full-screen-grid-container row section-container">
                        <img src={pic} alt="Logo" />
                    </div>
                </div>
                {/*resume*/}
                <Resume/>
                {/*travel*/}
                <div id="travel-container">
                    <div className="grid-container row">
                        <div className="col-sm-12">
                            <h1 id="travel-title" className="page-title">Travel</h1>
                        </div>
                    </div>
                    <div className="full-screen-grid-container row section-container">
                        <section id="travel-map-container" className="col-sm-12 no-padding">
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
                                                onClick={this._onMarkerClick}
                                                name={mapMarker.title}
                                                position={{lat: mapMarker.lat, lng: mapMarker.lng}}
                                            />
                                        )
                                    })
                                }
                                <InfoWindow
                                    marker={this.state.activeMarker}
                                    visible={!!this.state.activeMarker}
                                    onClose={this._onInfoWindowClose}
                                >
                                    <div>
                                        <p className="no-margin">{this.state.activeMarker ? this.state.activeMarker.name : ''}</p>
                                    </div>
                                </InfoWindow>
                            </Map>
                        </section>
                    </div>
                </div>
                {/*hauptstimme*/}
                <Hauptstimme/>
                {/*reading list*/}
                <ReadingList/>
            </main>
        );
    }

    private _onMarkerClick(props: any, marker: any, e: any) {
        this.setState({
            activeMarker: marker,
        });
    }

    private _onInfoWindowClose() {
        this.setState({
            activeMarker: undefined
        });
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS || '')
})(Home)
