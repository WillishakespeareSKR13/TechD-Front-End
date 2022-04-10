import { css } from '@emotion/react';
import {
  AtomButton,
  AtomIcon,
  AtomImage,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import { IRestaurant } from 'graphql';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';

type Props = IRestaurant & {
  index?: number;
  width?: string;
};

const TagRestaurant = (props: Props) => {
  const { id, photo, name, cuisine_type, reviews, index, width } = props;
  const router = useRouter();
  const rating = useMemo(
    () =>
      Math.abs(
        (reviews?.reduce((acc, val) => acc + (val?.rating ?? 0), 0) ?? 0) /
          (reviews?.length ?? 0)
      ),
    [reviews]
  );
  return (
    <AtomButton
      key={id}
      onClick={() => {
        router.push(`/restaurants/${id}`);
      }}
      initial={{
        x: -10,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      exit={{
        x: 10,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        delay: (index ?? 0) * 0.2,
      }}
      customCSS={css`
        width: ${width ?? '320px'};
        padding: 0px;
        background-color: transparent;
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
    </AtomButton>
  );
};

export default TagRestaurant;

type PropsSkeleton = {
  key?: string;
  index?: number;
  width?: string;
};

export const TagRestaurantSkeleton: FC<PropsSkeleton> = (props) => {
  const { key, index, width } = props;
  return (
    <AtomWrapper
      key={key}
      initial={{
        x: -10,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        delay: (index ?? 0) * 0.2,
      }}
      customCSS={css`
        width: ${width ?? '320px'};
        display: flex;
        gap: 5px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
      `}
    >
      <AtomWrapper
        customCSS={css`
          height: 200px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e6e6e6;
          background: linear-gradient(
            90deg,
            #fff1f1 0%,
            #ffffff 50%,
            #fff1f1 100%
          );
          background-size: 200% 200%;
          animation: skeleton 1.8s ease-in-out infinite;
        `}
      />
      <AtomWrapper
        customCSS={css`
          height: 30px;
          border-radius: 4px;
          border: 1px solid #e6e6e6;
          background: linear-gradient(
            90deg,
            #fff1f1 0%,
            #ffffff 50%,
            #fff1f1 100%
          );
          background-size: 200% 200%;
          animation: skeleton 1.8s ease-in-out infinite;
        `}
      />

      <AtomWrapper
        customCSS={css`
          height: 24px;
          border-radius: 4px;
          border: 1px solid #e6e6e6;
          background: linear-gradient(
            90deg,
            #fff1f1 0%,
            #ffffff 50%,
            #fff1f1 100%
          );
          background-size: 200% 200%;
          animation: skeleton 1.8s ease-in-out infinite;
        `}
      />
      <AtomWrapper
        customCSS={css`
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          gap: 2px;
          width: 50%;
          height: 15px;
          border-radius: 4px;
          border: 1px solid #e6e6e6;
          background: linear-gradient(
            90deg,
            #fff1f1 0%,
            #ffffff 50%,
            #fff1f1 100%
          );
          background-size: 200% 200%;
          animation: skeleton 1.8s ease-in-out infinite;
        `}
      />
    </AtomWrapper>
  );
};
