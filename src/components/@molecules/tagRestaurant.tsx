import { css } from '@emotion/react';
import { AtomIcon, AtomImage, AtomText, AtomWrapper } from '@sweetsyui/ui';
import { IRestaurant } from 'graphql';
import React, { useMemo } from 'react';

const TagRestaurant = (props: IRestaurant) => {
  const { id, photo, name, cuisine_type, reviews } = props;
  const rating = useMemo(
    () =>
      Math.abs(
        (reviews?.reduce((acc, val) => acc + (val?.rating ?? 0), 0) ?? 0) /
          (reviews?.length ?? 0)
      ),
    [reviews]
  );
  return (
    <AtomWrapper
      key={id}
      customCSS={css`
        width: 320px;
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      `}
    >
      <AtomImage
        alt={`${photo}`}
        src={`${photo}`}
        customCSS={css`
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
        `}
      />
      <AtomText
        customCSS={css`
          color: #352f2f;
          font-size: 20px;
          font-weight: semi-bold;
        `}
      >
        {name}
      </AtomText>
      <AtomText
        customCSS={css`
          color: #6a6464;
          font-size: 16px;
          font-weight: semi-bold;
        `}
      >
        {cuisine_type}
      </AtomText>
      <AtomWrapper
        customCSS={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          gap: 2px;
        `}
      >
        {!rating || rating === 0 ? (
          <>
            {Array.from({ length: 5 }, (_, i) => (
              <AtomIcon
                key={`${id}-disable-${i}`}
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
                key={`${id}-up-${i}`}
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
                key={`${id}-down-${i}`}
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
  );
};

export default TagRestaurant;
