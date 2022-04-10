import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { GETRESTAURANTS } from '@Src/apollo/client/query/restaurants';
import TagRestaurant, {
  TagRestaurantSkeleton,
} from '@Src/components/@molecules/tagRestaurant';
import { RootStateType } from '@Src/redux/reducer';
import { AtomButton, AtomSeo, AtomText, AtomWrapper } from '@sweetsyui/ui';
import { AnimatePresence } from 'framer-motion';
import { IQueryFilter } from 'graphql';
import { NextPageFC } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

const index: NextPageFC = () => {
  const router = useRouter();
  const user = useSelector((state: RootStateType) => state.user);
  const { data, loading } = useQuery<IQueryFilter<'getRestaurants'>>(
    GETRESTAURANTS,
    {
      fetchPolicy: 'no-cache',
    }
  );
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
            Tu Feed
          </AtomText>
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
        {user.role === 'company' && (
          <AtomWrapper
            customCSS={css`
              width: 100%;
              padding: 25px 0px;
              gap: 20px;
            `}
          >
            <AtomText
              customCSS={css`
                font-size: 28px;
                color: #292929;
                font-weight: bold;
                line-height: 50px;
              `}
            >
              Tus Restaurantes
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
              {data?.getRestaurants
                ?.filter((e) => e?.company?.id === user?.id)
                ?.map((e, idx) => (
                  <TagRestaurant key={e?.id} index={idx} width="280px" {...e} />
                ))}
              <AtomButton
                onClick={() => {
                  router.push(`/feed/restaurant/new`);
                }}
                customCSS={css`
                  width: 280px;
                  height: 200px;
                  padding: 0px;
                  border: 1px solid #a2271b;
                  background-color: transparent;
                  display: flex;
                  gap: 5px;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                `}
              >
                <AtomText
                  customCSS={css`
                    color: #a2271b;
                    font-size: 18px;
                    font-weight: semi-bold;
                  `}
                >
                  Agregar Restaurante
                </AtomText>
              </AtomButton>
            </AtomWrapper>
          </AtomWrapper>
        )}
        <AtomWrapper
          customCSS={css`
            width: 100%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomText
            customCSS={css`
              font-size: 28px;
              color: #292929;
              font-weight: bold;
              line-height: 50px;
            `}
          >
            Tus Restaurantes Favoritos
          </AtomText>
          <AnimatePresence exitBeforeEnter>
            {loading ? (
              Array.from({ length: 25 }, (_, idx) => (
                <TagRestaurantSkeleton
                  key={`${idx}`}
                  index={idx}
                  width="280px"
                />
              ))
            ) : (
              <>
                {data?.getRestaurants?.filter((e) =>
                  e?.reviews?.find((e) => e?.user?.id === user?.id)
                ).length ?? 0 > 0 ? (
                  <AtomWrapper
                    customCSS={css`
                      display: flex;
                      flex-wrap: wrap;
                      flex-direction: row;
                      justify-content: space-between;
                      gap: 25px;
                    `}
                  >
                    {data?.getRestaurants
                      ?.filter((e) =>
                        e?.reviews?.find((e) => e?.user?.id === user?.id)
                      )
                      ?.map((e, idx) => (
                        <TagRestaurant
                          key={e?.id}
                          index={idx}
                          width="280px"
                          {...e}
                        />
                      ))}
                  </AtomWrapper>
                ) : (
                  <AtomText
                    customCSS={css`
                      font-size: 18px;
                      color: #5f5f5f;
                      font-weight: bold;
                      line-height: 50px;
                    `}
                  >
                    Lo sentimos, no tienes restaurantes favoritos
                  </AtomText>
                )}
              </>
            )}
          </AnimatePresence>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default index;

index.Layout = 'public';
