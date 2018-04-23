import * as React from 'react';
import { Helmet } from 'react-helmet';
import '../../sass/components/pages/home.css'
import * as Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faLinkedIn from '@fortawesome/fontawesome-free-brands/faLinkedin'
import {MapMarkerInterface} from '../../interfaces/mapMarker.interface';
import {TravelService} from '../../services/travel.service';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as _ from 'lodash';

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
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }

    render() {
        const randomIndex: number = _.random(0, this.travelMarkers.length);
        return (
            <div className="grid-container row">
                <Helmet>
                    <title>Mike Stumpf</title>
                </Helmet>
                <div className="col-sm-12">
                    <h1 id="resume-title" className="page-title">Mike Stumpf</h1>
                </div>
                <div id="resume-body" className="col-sm-12 row">
                    <Fade>
                        <section className="col-sm-12">
                            <h2>Developer</h2>
                            <p>
                                DRY programmer with <strong>6 years</strong> of professional web development experience building bespoke websites and RESTful APIs using JavaScript, PHP, CSS, and HTML.
                            </p>
                            <p>
                                Equally comfortable in the front-end or the back-end and has a wide range of experience with different languages and frameworks. Familiar with working on several projects simultaneously and switching between different technology stacks on a regular basis.
                            </p>
                            <p>
                                Respected leader and experienced communicator who is able to plan for both long and short-term deadlines while continuously managing internal and external expectations and accommodating unexpected events.
                            </p>
                            <p>
                                Personal projects include creating a <a href="https://github.com/mike-stumpf/hauptstimme.js" target="_blank">JavaScript library for music theory</a>, collaborating on a Bluetooth-synchronized metronome mobile app, and developing a <a href="https://github.com/mike-stumpf/wp-reading-list" target="_blank">reading list plugin for WordPress</a>.
                            </p>
                            <h3 className="text-center">
                                <strong>
                                    <a href="https://www.linkedin.com/in/mikestumpf" target="_blank">
                                        View my full CV on Linked<FontAwesomeIcon icon={faLinkedIn} className="fa"/>
                                    </a>
                                </strong>
                            </h3>
                        </section>
                        <section className="col-sm-6">
                            <h2>Experience</h2>
                            <h3>Senior Web Developer</h3>
                            <h5>2017&ndash;Present &mdash; <a href="https://www.recommenderx.com/" target="_blank">RecommenderX. Dublin, Ireland</a></h5>
                            <h3>Lead Web Developer</h3>
                            <h5>2013&ndash;2017 &mdash; <a href="http://ollon.ellefsontech.com/" target="_blank">Ellefson Technology. Toronto, Canada</a></h5>
                            <h3>Project Manager & Web Developer</h3>
                            <h5>2012&ndash;2013 &mdash; <a href="https://www.utoronto.ca/" target="_blank">University of Toronto, Toronto, Canada</a></h5>
                            <h3>Database Engineer</h3>
                            <h5>2012 &mdash; <a href="http://www.purdue.edu/" target="_blank">Purdue University, West Lafayette, USA</a></h5>
                        </section>
                        <section className="col-sm-6">
                            <h2>Education</h2>
                            <h3>Higher Diploma in Science, Computing</h3>
                            <h5>2017 &mdash; <a href="http://www.itb.ie/" target="_blank">Institute of Technology-Blanchardstown. Dublin, Ireland</a></h5>
                            <h3>MA, Renaissance Literature 1500-1700</h3>
                            <h5>2013 &mdash; <a href="http://www.york.ac.uk/" target="_blank">University of York. York, England</a></h5>
                            <h3>BS, English Language & Literature</h3>
                            <h5>2011 &mdash; <a href="http://www.wisc.edu/" target="_blank">University of Wisconsin-Madison. Madison, USA</a></h5>
                        </section>
                    </Fade>
                </div>
                <div className="col-sm-12">
                    <a href="/assets/Mike_Stumpf_Resume_2018.pdf" className="button" target="_blank">
                        <span>Download Resume</span>
                    </a>
                </div>
                <div className="col-sm-12">
                    <h1 id="travel-title" className="page-title">Travel</h1>
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
        );
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
})(Home)
