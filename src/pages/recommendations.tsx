import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { GETRESTAURANTS } from '@Src/apollo/client/query/restaurants';
import AtomMap from '@Src/components/@atoms/AtomMap';
import TagRestaurant, {
  TagRestaurantSkeleton,
} from '@Src/components/@molecules/tagRestaurant';
import { RootStateType } from '@Src/redux/reducer';
import {
  AtomButton,
  AtomIcon,
  AtomInput,
  AtomSeo,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import { AnimatePresence } from 'framer-motion';
import { IQueryFilter } from 'graphql';
import { NextPageFC } from 'next';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const index: NextPageFC = () => {
  const cordinates = useSelector((state: RootStateType) => state.cordinates);
  const [search, setSearch] = useState('');
  const { data, loading } =
    useQuery<IQueryFilter<'getRestaurants'>>(GETRESTAURANTS);
  return (
    <>
      <AtomSeo
        page="Home"
        title="Melp"
        website="https://melp.vercel.app/"
        icon="/favicon.png"
      />

      <AtomWrapper
        customCSS={css`
          align-items: center;
          justify-content: center;
          padding: 120px 0px 100px 0px;
          background: linear-gradient(
              0deg,
              rgba(1, 11, 1, 0.7) 0%,
              rgba(79, 29, 29, 0.5) 50%
            ),
            url('/images/search.webp');
          position: relative;
          background-size: cover;
        `}
      >
        <AtomWrapper
          customCSS={css`
            max-width: 1440px;
            height: 100%;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0px 90px;
            gap: 18px;
            @media only screen and (max-width: 980px) {
              padding: 0px 30px;
            }
          `}
        >
          <AtomText
            customCSS={css`
              font-size: 40px;
              color: #ffffff;
              font-weight: bold;
              line-height: 50px;
            `}
          >
            Los Mejores restaurantes cerca de ti
          </AtomText>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              background-color: #ffffff;
              width: 100%;
              margin-top: 10px;
              max-width: 70%;
              border-radius: 8px;
              box-shadow: (0px 5px 11px rgba(0, 0, 0, 0.25));

              @media only screen and (max-width: 980px) {
                max-width: 100%;
              }
            `}
          >
            <AtomInput
              border="none"
              labelWidth="100%"
              placeholder="Direcion, Ciudad, Estado"
              placeholderColor="#A4A4A4"
              padding="0px 30px"
              height="50px"
              fontSize="14px"
              onChange={(e) => setSearch(e.target.value)}
            />
            <AtomButton
              whileHover={{
                scale: 1.02,

                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98, opacity: 0.8 }}
              customCSS={css`
                height: 40px;
                background-color: #e93c2a;
                padding: 0px 20px;
                margin: 0px 5px;
                font-size: 14px;
              `}
            >
              <AtomIcon
                color="white"
                width="20px"
                height="20px"
                icon="/icons/search.svg"
              />
            </AtomButton>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>

      <AtomMap
        Markers={data?.getRestaurants
          ?.filter(
            (restaurant) =>
              restaurant?.name?.toLowerCase().includes(search.toLowerCase()) ||
              restaurant?.cuisine_type
                ?.toLocaleLowerCase()
                ?.includes(search.toLocaleLowerCase())
          )
          ?.filter((e) => {
            const lat = e?.latlng?.lat || 0;
            const lng = e?.latlng?.lng || 0;
            const latMax = cordinates.lat + 0.004;
            const latMin = cordinates.lat - 0.004;
            const lngMax = cordinates.lng + 0.004;
            const lngMin = cordinates.lng - 0.004;
            return (
              lat <= latMax && lat >= latMin && lng <= lngMax && lng >= lngMin
            );
          })
          ?.map((e) => ({
            id: e?.name,
            lat: e?.latlng?.lat,
            lng: e?.latlng?.lng,
          }))}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBogrrOMSmXlcjuqv127MDoOVlw55ykqYY&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `500px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />

      <AtomWrapper
        customCSS={css`
          max-width: 1440px;
          min-height: calc(100vh - 90px);
          height: 100%;
          align-items: center;
          justify-content: flex-start;
          padding: 0px 90px 90px 90px;
          @media only screen and (max-width: 980px) {
            padding: 0px 30px 30px 30px;
          }
        `}
      >
        <AtomWrapper
          customCSS={css`
            width: 100%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomText
            customCSS={css`
              font-size: 32px;
              color: #292929;
              font-weight: bold;
              line-height: 1.2;
              text-align: center;
            `}
          >
            Los Mejores restaurantes cerca de ti
          </AtomText>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
              gap: 25px;
            `}
          >
            <AnimatePresence exitBeforeEnter>
              {loading
                ? Array.from({ length: 25 }, (_, idx) => (
                    <TagRestaurantSkeleton
                      key={`${idx}`}
                      index={idx}
                      width="280px"
                    />
                  ))
                : data?.getRestaurants
                    ?.filter(
                      (restaurant) =>
                        restaurant?.name
                          ?.toLowerCase()
                          .includes(search.toLowerCase()) ||
                        restaurant?.cuisine_type
                          ?.toLocaleLowerCase()
                          ?.includes(search.toLocaleLowerCase())
                    )
                    ?.filter((e) => {
                      const lat = e?.latlng?.lat || 0;
                      const lng = e?.latlng?.lng || 0;
                      const latMax = cordinates.lat + 0.004;
                      const latMin = cordinates.lat - 0.004;
                      const lngMax = cordinates.lng + 0.004;
                      const lngMin = cordinates.lng - 0.004;
                      return (
                        lat <= latMax &&
                        lat >= latMin &&
                        lng <= lngMax &&
                        lng >= lngMin
                      );
                    })
                    ?.slice()
                    ?.sort((a, b) => {
                      const reduceA = Math.abs(
                        (a?.reviews?.reduce(
                          (acc, val) => acc + (val?.rating ?? 0),
                          0
                        ) ?? 0) / (a?.reviews?.length ?? 0)
                      );
                      const reduceB = Math.abs(
                        (b?.reviews?.reduce(
                          (acc, val) => acc + (val?.rating ?? 0),
                          0
                        ) ?? 0) / (b?.reviews?.length ?? 0)
                      );
                      return reduceB - reduceA ? 1 : -1;
                    })
                    ?.map((e, idx) => (
                      <TagRestaurant
                        key={e?.id}
                        index={idx}
                        width="280px"
                        {...e}
                      />
                    ))}
            </AnimatePresence>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default index;
