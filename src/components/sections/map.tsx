import { useCallback, useEffect, useState } from 'react';
import { DataService, UtilService } from '@/services';
import { AdvancedMarker, APIProvider, InfoWindow, Map, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { TravelMarker } from '@/types';

interface Props {
  travelMarker: TravelMarker;
  activeTravelMarkerIndex: number | null;
  setActiveTravelMarkerIndex: (index: number | null) => void;
  index: number;
}

// https://visgl.github.io/react-google-maps/docs/api-reference/components/info-window
const MarkerWithInfoWindow = (props: Props) => {
  const { travelMarker, activeTravelMarkerIndex, setActiveTravelMarkerIndex, index } = props;
  const { lat, lng, title } = travelMarker;
  // `markerRef` and `marker` are needed to establish the connection between
  // the marker and infowindow (if you're using the Marker component, you
  // can use the `useMarkerRef` hook instead).
  const [markerRef, marker] = useAdvancedMarkerRef();

  const [infoWindowShown, setInfoWindowShown] = useState(false);

  // clicking the marker will toggle the infowindow
  const handleMarkerClick = useCallback(
    () => {
      setInfoWindowShown(true);
      // alert parent to active info window index
      setActiveTravelMarkerIndex(index);
    }
    , [setActiveTravelMarkerIndex, index]);

  // handle different info window index opening
  useEffect(() => {
    if (infoWindowShown && activeTravelMarkerIndex !== index) {
      setInfoWindowShown(false);
    }
  }, [activeTravelMarkerIndex]);


  // if the maps api closes the infowindow, we have to synchronize our state
  const handleClose = useCallback(() => {
    setInfoWindowShown(false);
  }, []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        title={title}
        position={{ lat, lng }}
        onClick={handleMarkerClick}
      />

      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose} shouldFocus={false}>
          <h4 className='no-margin'>{title}</h4>
        </InfoWindow>
      )}
    </>
  );
};

export default function LocationMap() {
  const travelMarkers: TravelMarker[] = DataService.getTravelMarkers();
  const [activeTravelMarkerIndex, setActiveTravelMarkerIndex] = useState<number | null>(null);
  const randomIndex = UtilService.getRandomIntInclusive(
    0,
    travelMarkers.length,
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        defaultZoom={4}
        maxZoom={9}
        minZoom={3}
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        defaultCenter={{
          lat: travelMarkers[randomIndex].lat,
          lng: travelMarkers[randomIndex].lng,
        }}
        gestureHandling='greedy'
        mapId='MICHAEL_BRITTLEBANK'>
        <>
          {travelMarkers.map((travelMarker, index) =>
            <MarkerWithInfoWindow key={index} index={index}
                                  travelMarker={travelMarker}
                                  activeTravelMarkerIndex={activeTravelMarkerIndex}
                                  setActiveTravelMarkerIndex={setActiveTravelMarkerIndex} />)}
        </>
      </Map>
    </APIProvider>
  );
}
