import { useMutation, useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { UPDATERESTAURANT } from '@Src/apollo/client/mutation/restaurants';
import {
  GETRESTAURANTBYID,
  GETRESTAURANTS,
} from '@Src/apollo/client/query/restaurants';
import AtomMapEdit from '@Src/components/@atoms/AtomMapEdit';
import TagComment from '@Src/components/@molecules/tagComment';
import TagRestaurant, {
  TagRestaurantSkeleton,
} from '@Src/components/@molecules/tagRestaurant';
import { useAlert } from '@Src/hooks/alertContext';
import { RootStateType } from '@Src/redux/reducer';
import {
  AtomButton,
  AtomIcon,
  AtomInput,
  AtomLink,
  AtomLoader,
  AtomSeo,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import AtomCarrousell from '@sweetsyui/ui/build/@atoms/AtomCarruosell';
import { useFormik } from 'formik';
import { IQueryFilter } from 'graphql';
import { NextPageFC } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';

const index: NextPageFC = () => {
  const router = useRouter();
  const { insertAlert } = useAlert();
  const user = useSelector((state: RootStateType) => state.user);
  const { data, loading, refetch } = useQuery<
    IQueryFilter<'getRestaurantById'>
  >(GETRESTAURANTBYID, {
    skip: router.query.id === undefined,
    variables: {
      id: router.query.id,
    },
  });

  const { data: dataRestaurant, loading: loadingRestaurant } =
    useQuery<IQueryFilter<'getRestaurants'>>(GETRESTAURANTS);

  const [EXEUPDATERES] = useMutation(UPDATERESTAURANT, {
    onCompleted: () => {
      refetch();
      formik?.resetForm();
    },
    onError: (error) =>
      insertAlert({
        id: uuidv4(),
        type: 'error',
        message: error.message,
      }),
  });

  const formik = useFormik({
    initialValues: {
      comment: '',
      rating: 0,
    },
    validationSchema: Yup.object({
      comment: Yup.string().required(),
    }),
    onSubmit: (values) => {
      EXEUPDATERES({
        variables: {
          id: router.query.id,
          input: {
            reviews: [
              ...(data?.getRestaurantById?.reviews?.map((e) => ({
                ...e,
                user: e?.user?.id,
              })) ?? []),
              {
                user: user.id,
                date: new Date().toISOString(),
                rating: values.rating,
                comments: values.comment,
              },
            ],
          },
        },
      });
    },
  });

  const rating = useMemo(
    () =>
      Math.round(
        (data?.getRestaurantById?.reviews?.reduce(
          (acc, val) => acc + (val?.rating ?? 0),
          0
        ) ?? 0) / (data?.getRestaurantById?.reviews?.length ?? 0)
      ),
    [data?.getRestaurantById?.reviews]
  );

  return (
    <>
      <AtomLoader isLoading={loading} colorLoading="#e93c2a" />
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
          background: linear-gradient(
              0deg,
              rgba(1, 11, 1, 0.7) 0%,
              rgba(79, 29, 29, 0.5) 50%
            ),
            url(${data?.getRestaurantById?.photo});
          background-position: center;
          background-size: cover;
          position: relative;
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
              font-size: 38px;
              color: #ffffff;
              font-weight: bold;
              line-height: 50px;
            `}
          >
            {data?.getRestaurantById?.name}
          </AtomText>
          <AtomWrapper
            customCSS={css`
              width: max-content;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin-top: 5 px;
              border-radius: 8px;
              gap: 5px;
              box-shadow: (0px 5px 11px rgba(0, 0, 0, 0.25));
            `}
          >
            {!rating || rating === 0 ? (
              <>
                {Array.from({ length: 5 }, (_, i) => (
                  <AtomIcon
                    initial={{
                      x: -5,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                    }}
                    key={`${data?.getRestaurantById?.id}-disable-${i}`}
                    height="15px"
                    width="15px"
                    icon="/icons/star.svg"
                    customCSS={css`
                      svg {
                        path {
                          fill: #b9b9b9 !important;
                        }
                      }
                    `}
                  />
                ))}
              </>
            ) : (
              <>
                {Array.from({ length: rating }, (_, i) => (
                  <AtomIcon
                    initial={{
                      x: -5,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.1,
                    }}
                    key={`${data?.getRestaurantById?.id}-up-${i}`}
                    height="15px"
                    width="15px"
                    icon="/icons/star.svg"
                    customCSS={css`
                      svg {
                        path {
                          fill: #eb8f8f !important;
                        }
                      }
                    `}
                  />
                ))}
                {Array.from({ length: 5 - rating }, (_, i) => (
                  <AtomIcon
                    initial={{
                      x: -5,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: (5 - rating + i) * 0.1,
                    }}
                    key={`${data?.getRestaurantById?.id}-down-${i}`}
                    height="15px"
                    width="15px"
                    icon="/icons/star.svg"
                    customCSS={css`
                      svg {
                        path {
                          fill: #b9b9b9 !important;
                        }
                      }
                    `}
                  />
                ))}
              </>
            )}
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
            width: 100%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: row;
              justify-content: space-between;
              gap: 25px;
              @media only screen and (max-width: 980px) {
                flex-direction: column;
              }
            `}
          >
            <AtomWrapper
              customCSS={css`
                width: 60%;
                padding: 25px 0px;
                gap: 20px;
                @media only screen and (max-width: 980px) {
                  width: 100%;
                }
              `}
            >
              {data?.getRestaurantById?.reviews?.map((review, idx) => (
                <TagComment
                  {...review}
                  index={idx}
                  key={`${data?.getRestaurantById?.id}-review-${idx}`}
                  id={`${data?.getRestaurantById?.id}-review-${idx}`}
                />
              ))}
              {user.id ? (
                <AtomWrapper
                  customCSS={css`
                    margin-top: 20px;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                  `}
                >
                  <AtomWrapper
                    customCSS={css`
                      width: 100%;
                    `}
                  >
                    <AtomText
                      customCSS={css`
                        font-size: 18px;
                        color: #a2271b;
                        font-weight: bold;
                        margin-bottom: 10px;
                      `}
                    >
                      Deja un comentario
                    </AtomText>
                    <AtomWrapper
                      customCSS={css`
                        max-width: max-content;
                        display: flex;
                        flex-direction: row;
                        margin-bottom: 10px;
                      `}
                    >
                      <>
                        {Array.from(
                          { length: formik.values.rating },
                          (_, i) => (
                            <AtomButton
                              customCSS={css`
                                padding: 0px;
                                background-color: transparent;
                              `}
                              key={`${data?.getRestaurantById?.id}-up-${i}`}
                              onClick={() => {
                                formik.setFieldValue('rating', i + 1);
                              }}
                            >
                              <AtomIcon
                                initial={{
                                  x: -5,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.4,
                                  delay: i * 0.1,
                                }}
                                height="15px"
                                width="15px"
                                icon="/icons/star.svg"
                                customCSS={css`
                                  svg {
                                    path {
                                      fill: #eb8f8f !important;
                                    }
                                  }
                                `}
                              />
                            </AtomButton>
                          )
                        )}
                        {Array.from(
                          { length: 5 - formik.values.rating },
                          (_, i) => (
                            <AtomButton
                              key={`${data?.getRestaurantById?.id}-down-${i}`}
                              customCSS={css`
                                padding: 0px;
                                background-color: transparent;
                              `}
                              onClick={() => {
                                formik.setFieldValue(
                                  'rating',
                                  i + 1 + formik.values.rating
                                );
                              }}
                            >
                              <AtomIcon
                                initial={{
                                  x: -5,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                }}
                                transition={{
                                  duration: 0.4,
                                  delay: (5 - formik.values.rating + i) * 0.1,
                                }}
                                height="15px"
                                width="15px"
                                icon="/icons/star.svg"
                                customCSS={css`
                                  svg {
                                    path {
                                      fill: #b9b9b9 !important;
                                    }
                                  }
                                `}
                              />
                            </AtomButton>
                          )
                        )}
                      </>
                    </AtomWrapper>
                    <AtomInput
                      id="comment"
                      placeholder="Escribe tu comentario"
                      formik={formik}
                      labelWidth="100%"
                      type="textbox"
                      height="150px"
                      padding="20px"
                    />
                    <AtomButton
                      onClick={() => {
                        formik.handleSubmit();
                      }}
                      customCSS={css`
                        width: 100%;
                        margin-top: 20px;
                      `}
                    >
                      Comentar
                    </AtomButton>
                  </AtomWrapper>
                </AtomWrapper>
              ) : (
                <AtomWrapper
                  customCSS={css`
                    margin-top: 20px;
                    display: flex;
                    flex-direction: row;
                    @media only screen and (max-width: 980px) {
                      justify-content: space-between;
                    }
                  `}
                >
                  <AtomText
                    customCSS={css`
                      margin-right: 10px;
                      color: #a2271b;
                      @media only screen and (max-width: 980px) {
                        width: calc(100% - 200px);
                      }
                    `}
                  >
                    Inicia sesión para poder escribir una reseña
                  </AtomText>
                  <AtomLink
                    link="/login"
                    customCSS={css`
                      color: #a2271b;
                    `}
                  >
                    Iniciar sesión
                  </AtomLink>
                </AtomWrapper>
              )}
            </AtomWrapper>
            <AtomWrapper
              customCSS={css`
                width: 30%;
                padding: 25px 0px;
                gap: 20px;
                @media only screen and (max-width: 980px) {
                  width: 100%;
                }
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
                    font-size: 16px;
                    color: #292929;
                    font-weight: bold;
                    line-height: 1.2;
                    @media only screen and (max-width: 980px) {
                      width: calc(100% - 100px);
                    }
                  `}
                >
                  Otros restaurantes
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
                    slidesPerView: 1,
                    spaceBetween: 20,
                  }}
                  customCSS={css`
                    .swiper-slide {
                      align-items: flex-start;
                    }
                    .swiper-pagination-bullets.swiper-pagination-horizontal {
                      bottom: 0px;
                    }
                    .swiper-button-next {
                      display: none;
                    }
                    .swiper-button-prev {
                      display: none;
                    }
                  `}
                  skeleton={
                    loadingRestaurant
                      ? Array.from({ length: 4 }, (_, idx) => (
                          <TagRestaurantSkeleton key={`${idx}`} index={idx} />
                        ))
                      : []
                  }
                >
                  {dataRestaurant?.getRestaurants?.map((e, idx) => (
                    <TagRestaurant key={e?.id} index={idx} {...e} />
                  ))}
                </AtomCarrousell>
              </AtomWrapper>
            </AtomWrapper>
          </AtomWrapper>
        </AtomWrapper>
        <AtomMapEdit
          cordinates={{
            lat: data?.getRestaurantById?.latlng?.lat ?? 0,
            lng: data?.getRestaurantById?.latlng?.lng ?? 0,
          }}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBogrrOMSmXlcjuqv127MDoOVlw55ykqYY&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px`, width: '100%' }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </AtomWrapper>
    </>
  );
};

export default index;

index.Layout = 'public';
