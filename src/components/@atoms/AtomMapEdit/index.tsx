/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetCordinates } from '@Src/redux/actions/cordinates';
import { useEffect, useState } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import withScriptjs from 'react-google-maps/lib/withScriptjs';
import { useDispatch } from 'react-redux';

const AtomMapEdit = withScriptjs(
  withGoogleMap(
    ({
      cordinates,
    }: {
      cordinates: {
        lat: number;
        lng: number;
      };
    }) => {
      const dispatch = useDispatch();
      const [defaultCenter, setDefaultCenter] = useState(
        cordinates ?? {
          lat: 24.118622012692892,
          lng: -103.15314899465986,
        }
      );

      useEffect(() => {
        setDefaultCenter(cordinates);
      }, [cordinates.lat, cordinates.lng]);

      return (
        <>
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
          </GoogleMap>
        </>
      );
    }
  )
);

export default AtomMapEdit;
