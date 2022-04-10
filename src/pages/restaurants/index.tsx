import { useQuery } from '@apollo/client';
import { css } from '@emotion/react';
import { GETRESTAURANTS } from '@Src/apollo/client/query/restaurants';
import TagRestaurant, {
  TagRestaurantSkeleton,
} from '@Src/components/@molecules/tagRestaurant';
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
import React, { useState } from 'react';

const index: NextPageFC = () => {
  const [search, setSearch] = useState('');
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
            Encuentra tu proximo restaurante favorito
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
              placeholder="¿Que quieres almorzar hoy?"
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

index.Layout = 'public';
