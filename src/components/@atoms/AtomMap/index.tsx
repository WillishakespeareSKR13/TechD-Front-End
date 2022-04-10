/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetCordinates } from '@Src/redux/actions/cordinates';
import { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker, Circle } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import { useDispatch } from 'react-redux';

const AtomMap = withScriptjs(
  withGoogleMap(({ Markers }: { Markers: any }) => {
    const dispatch = useDispatch();
    const [defaultCenter, setDefaultCenter] = useState({
      lat: 24.118622012692892,
      lng: -103.15314899465986,
    });

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setDefaultCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          dispatch(
            SetCordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
        });
      }
    }, [navigator]);

    return (
      <GoogleMap
        onClick={(e) => {
          setDefaultCenter({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          });
          dispatch(
            SetCordinates({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            })
          );
        }}
        center={defaultCenter}
        zoom={16}
        defaultCenter={defaultCenter}
        defaultZoom={16}
      >
        <Marker
          position={{
            lat: defaultCenter.lat,
            lng: defaultCenter.lng,
          }}
        />

        <Circle
          center={{
            lat: defaultCenter.lat,
            lng: defaultCenter.lng,
          }}
          radius={500}
          options={{
            strokeColor: '#a2271b',
          }}
          onClick={(e) => {
            setDefaultCenter({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
            dispatch(
              SetCordinates({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              })
            );
          }}
        />
        {Markers?.map((marker: any) => (
          <Marker
            key={marker.id}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        ))}
      </GoogleMap>
    );
  })
);

export default AtomMap;
