import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { GETRESTAURANTS } from '@Src/apollo/client/query/restaurants';
import TagInfo from '@Src/components/@molecules/tagInfo';
import TagRestaurant from '@Src/components/@molecules/tagRestaurant';
import {
  AtomButton,
  AtomImage,
  AtomInput,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import AtomCarrousell from '@sweetsyui/ui/build/@atoms/AtomCarruosell';
import { IQueryFilter } from 'graphql';
import { FC } from 'react';
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

const index: FC = () => {
  const { data } = useQuery<IQueryFilter<'getRestaurants'>>(GETRESTAURANTS);
  return (
    <>
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
            `}
          >
            Encuentra los mejores restaurantes <br /> a un click de distancia.
          </AtomText>
          <AtomText
            customCSS={css`
              font-size: 16px;
              color: #ffffff;
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
              `}
            >
              Buscar
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
            {tagsInfo.map((e) => (
              <TagInfo key={e.id} {...e} />
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
          <AtomText
            customCSS={css`
              font-weight: 700;
              font-size: 24px;
              color: #292929;
              font-weight: bold;
              line-height: 1.2;
            `}
          >
            Los Restaurantes mas valorados
          </AtomText>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
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
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  720: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 4,
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
            >
              {data?.getRestaurants?.map((e) => (
                <TagRestaurant key={e?.id} {...e} />
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
          <AtomText
            customCSS={css`
              font-weight: 700;
              font-size: 24px;
              color: #292929;
              font-weight: bold;
              line-height: 1.2;
            `}
          >
            Restaurantes cerca de tu Zona
          </AtomText>
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
                    spaceBetween: 20,
                  },
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  720: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                  },
                  1280: {
                    slidesPerView: 4,
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
            >
              {data?.getRestaurants?.map((e) => (
                <TagRestaurant key={e?.id} {...e} />
              ))}
            </AtomCarrousell>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default index;
