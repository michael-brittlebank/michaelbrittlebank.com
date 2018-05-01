import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/home.css'
import {MapMarkerInterface} from '../../interfaces/mapMarker.interface';
import {TravelService} from '../../services/travel.service';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import map = require('lodash/map')
import random = require('lodash/random')
import Resume from '../sections/resume';
import * as pic from '../../assets/face.jpg';
import * as Fade from 'react-reveal/Fade';
import Portfolio from '../sections/portfolio';

interface State {
    activeMarker: any;
    isMounted: boolean;
}

interface Props {
    google: any;
}

export class Home extends React.Component<Props, State> {

    private travelMarkers: MapMarkerInterface[] = TravelService.getAvailableTravelMarkers();

    constructor(props: Props) {
        super(props);
        this.state = {
            activeMarker: undefined,
            isMounted: false
        };
        this._onMarkerClick = this._onMarkerClick.bind(this);
        this._onInfoWindowClose = this._onInfoWindowClose.bind(this);
    }

    componentDidMount() {
        this.setState({ isMounted: true });
    }

    render() {
        const randomIndex: number = random(0, this.travelMarkers.length - 1);
        return (
            <main id="home-page" className={!this.state.isMounted ? 'faded-out' : ''}>
                <Helmet>
                    <title>Mike Stumpf</title>
                </Helmet>
                <div id="home-container">
                    <div id="home-image-container" className="full-screen-grid-container row section-container">
                        <Fade>
                            <img id="home-image" src={pic} alt="Logo" />
                        </Fade>
                        <div id="home-logo" className="animated fadeInRight">
                            <p>Mike</p>
                            <p>Stumpf</p>
                        </div>
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
                    <div className="full-screen-grid-container row">
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
                                    map(this.travelMarkers, (mapMarker: MapMarkerInterface, index: number) => {
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
                    <section className="full-screen-grid-container row">
                        <div className="col-sm-12 spacer orange"/>
                    </section>
                </div>
                {/*portfolio*/}
                <Portfolio/>
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
