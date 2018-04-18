import * as React from 'react';
import {MapMarkerInterface} from '../../interfaces/mapMarker.interface';
import {TravelMarkers} from './travelMarkers';
import '../../sass/components/pages/travel.css'

export default class Travel extends React.Component {

    private travelMarkers: MapMarkerInterface[] = TravelMarkers.getAvailableTravelMarkers();

    // todo, https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/

    render() {
        console.log('I was triggered during render', this.travelMarkers);
        return (
            <div className="grid-container row">
                <div className="col-sm-12">
                    <h1 className="page-title">Travel</h1>
                </div>
            </div>
        )
    }
}