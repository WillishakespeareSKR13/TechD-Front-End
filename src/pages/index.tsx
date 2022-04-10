import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { GETRESTAURANTS } from '@Src/apollo/client/query/restaurants';
import TagInfo from '@Src/components/@molecules/tagInfo';
import TagRestaurant, {
  TagRestaurantSkeleton,
} from '@Src/components/@molecules/tagRestaurant';
import { SetCordinates } from '@Src/redux/actions/cordinates';
import { RootStateType } from '@Src/redux/reducer';
import {
  AtomButton,
  AtomIcon,
  AtomImage,
  AtomInput,
  AtomLink,
  AtomSeo,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import AtomCarrousell from '@sweetsyui/ui/build/@atoms/AtomCarruosell';
import { IQueryFilter } from 'graphql';
import { NextPageFC } from 'next';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const tagsInfo = [
  {
    id: uuidv4(),
    icon: '/icons/tagsinfo/1.svg',
    title: 'Los mejores lugares para comer',
    description: 'Encuentra +500 Restaurantes',
  },
  {
    id: uuidv4(),
    icon: '/icons/tagsinfo/2.svg',
    title: 'Conoce a los mas valorados',
    description: 'Millones de restaurantes a un click',
  },
  {
    id: uuidv4(),
    icon: '/icons/tagsinfo/3.svg',
    title: 'Los mejores menus de cocina',
    description: 'Disfrutas de diferentes tipos de comidas',
  },
];

const index: NextPageFC = () => {
  const cordinates = useSelector((state: RootStateType) => state.cordinates);
  const { data, loading } =
    useQuery<IQueryFilter<'getRestaurants'>>(GETRESTAURANTS);
  const dispatch = useDispatch();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          SetCordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }
  }, [navigator.geolocation]);
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
          padding: 140px 0px 100px 0px;
          background-color: #a2271b;
          position: relative;
        `}
      >
        <AtomImage
          alt="plate"
          src="/images/plate.png"
          customCSS={css`
            position: absolute;
            top: 0;
            right: 0;
            width: 45%;
            @media only screen and (max-width: 980px) {
              display: none;
            }
          `}
        />
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
              @media only screen and (max-width: 980px) {
                font-size: 36px;
                text-align: center;
              }
            `}
          >
            Encuentra los mejores restaurantes <br /> a un click de distancia.
          </AtomText>
          <AtomText
            customCSS={css`
              font-size: 16px;
              color: #ffffff;
              @media only screen and (max-width: 980px) {
                font-size: 14px;
                text-align: center;
              }
            `}
          >
            Los mejores platos y precios a tu disponibilidad. Tambien podrás
            <br />
            ver recomendaciones de restaurantes cerca de ti.
          </AtomText>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              background-color: #ffffff;
              width: 100%;
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
              placeholder="¿Que quieres almorzar hoy?"
              placeholderColor="#A4A4A4"
              padding="0px 30px"
              height="70px"
              fontSize="14px"
            />
            <AtomButton
              whileHover={{
                scale: 1.02,

                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98, opacity: 0.8 }}
              customCSS={css`
                height: 60px;
                background-color: #e93c2a;
                padding: 0px 60px;
                margin: 0px 5px;
                font-size: 14px;
                div {
                  display: none;
                }
                @media only screen and (max-width: 980px) {
                  padding: 0px 20px;
                  div {
                    display: flex;
                  }
                  span {
                    display: none;
                  }
                }
              `}
            >
              <AtomText color="white">Buscar</AtomText>
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
            width: 80%;
            align-items: center;
            justify-content: center;
            padding: 50px 0px;
            gap: 30px;
            @media only screen and (max-width: 980px) {
              width: 100%;
            }
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
            ¿Por qué usar Melp para tu busqueda?
          </AtomText>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
              gap: 20px;
            `}
          >
            {tagsInfo.map((e, idx) => (
              <TagInfo key={e.id} index={idx} {...e} />
            ))}
          </AtomWrapper>
        </AtomWrapper>

        <AtomWrapper
          customCSS={css`
            width: 100%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <AtomText
              customCSS={css`
                font-weight: 700;
                font-size: 24px;
                color: #292929;
                font-weight: bold;
                line-height: 1.2;
                @media only screen and (max-width: 980px) {
                  width: calc(100% - 100px);
                  font-size: 18px;
                }
              `}
            >
              Los Restaurantes mas valorados
            </AtomText>
            <AtomLink
              link="/restaurants"
              customCSS={css`
                font-weight: 700;
                font-size: 14px;
                color: #df6a6a;
                line-height: 1.2;
              `}
            >
              Ver todos
            </AtomLink>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
              height: 300px;
            `}
          >
            <AtomCarrousell
              height="330px"
              swiperProps={{
                slidesPerView: 4,
                spaceBetween: 20,
                breakpoints: {
                  320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30,
                  },
                  720: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 20,
                  },
                },
              }}
              customCSS={css`
                .swiper-slide {
                  align-items: flex-start;
                }
                .swiper-pagination-bullets.swiper-pagination-horizontal {
                  bottom: 0px;
                }
              `}
              skeleton={
                loading
                  ? Array.from({ length: 4 }, (_, idx) => (
                      <TagRestaurantSkeleton key={`${idx}`} index={idx} />
                    ))
                  : []
              }
            >
              {data?.getRestaurants
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
                  return reduceB - reduceA;
                })
                ?.map((e, idx) => (
                  <TagRestaurant key={e?.id} index={idx} {...e} />
                ))}
            </AtomCarrousell>
          </AtomWrapper>
        </AtomWrapper>

        <AtomWrapper
          customCSS={css`
            width: 100%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <AtomText
              customCSS={css`
                font-weight: 700;
                font-size: 24px;
                color: #292929;
                font-weight: bold;
                line-height: 1.2;
                @media only screen and (max-width: 980px) {
                  width: calc(100% - 100px);
                  font-size: 18px;
                }
              `}
            >
              Restaurantes cerca de tu Zona
            </AtomText>
            <AtomLink
              link="/restaurants"
              customCSS={css`
                font-weight: 700;
                font-size: 14px;
                color: #df6a6a;
                line-height: 1.2;
              `}
            >
              Ver todos
            </AtomLink>
          </AtomWrapper>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
              gap: 20px;
              min-height: 290px;
            `}
          >
            <AtomCarrousell
              height="330px"
              swiperProps={{
                slidesPerView: 4,
                spaceBetween: 20,
                breakpoints: {
                  320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 30,
                  },
                  720: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 20,
                  },
                },
              }}
              customCSS={css`
                .swiper-slide {
                  align-items: flex-start;
                }
                .swiper-pagination-bullets.swiper-pagination-horizontal {
                  bottom: 0px;
                }
              `}
              skeleton={
                loading || (cordinates.lat === 0 && cordinates.lng === 0)
                  ? Array.from({ length: 4 }, (_, idx) => (
                      <TagRestaurantSkeleton key={`${idx}`} index={idx} />
                    ))
                  : []
              }
            >
              {data?.getRestaurants
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
                  return reduceB - reduceA;
                })
                ?.map((e, idx) => (
                  <TagRestaurant key={e?.id} index={idx} width="280px" {...e} />
                ))}
            </AtomCarrousell>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default index;
