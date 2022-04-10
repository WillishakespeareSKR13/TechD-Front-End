/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetCordinatesNew } from '@Src/redux/actions/cordinatesnew';
import { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import { useDispatch } from 'react-redux';

const AtomMapNew: any = withScriptjs(
  withGoogleMap(() => {
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
            SetCordinatesNew({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          );
        });
      }
    }, [navigator]);

    return (
      <>
        <GoogleMap
          onClick={(e) => {
            dispatch(
              SetCordinatesNew({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              })
            );
            setDefaultCenter({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
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
        </GoogleMap>
      </>
    );
  })
);

export default AtomMapNew;
