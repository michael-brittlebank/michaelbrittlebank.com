import * as React from 'react';
import {MapMarkerInterface} from '../../interfaces/mapMarker.interface';
import {TravelMarkers} from './travelMarkers';

export default class Travel extends React.Component {

    private travelMarkers: MapMarkerInterface[] = TravelMarkers.getAvailableTravelMarkers();

    // todo, https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/

    render() {
        console.log('I was triggered during render', this.travelMarkers);
        return (
            <div>
                <h1>Travel</h1>
            </div>
        )
    }
}