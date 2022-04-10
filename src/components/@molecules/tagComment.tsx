import { css } from '@emotion/react';
import { AtomIcon, AtomImage, AtomText, AtomWrapper } from '@sweetsyui/ui';
import { IReview } from 'graphql';
import { FC } from 'react';

type Props = IReview & {
  index?: number;
  id?: string;
};

const TagComment = (props: Props) => {
  const { comments, index, rating, user, id } = props;

  return (
    <AtomWrapper
      key={id}
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
        width: 100%;
        padding: 0px;
        background-color: white;
        border-radius: 8px;
        box-shadow: (0px 5px 11px rgba(0, 0, 0, 0.25));
        display: flex;
        gap: 5px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
      `}
    >
      <AtomImage
        alt={`${user?.photo}`}
        src={`${user?.photo}`}
        customCSS={css`
          width: 120px;
          height: 120px;
          border-radius: 50%;
          overflow: hidden;
        `}
      />
      <AtomWrapper
        customCSS={css`
          padding: 25px 0px;
          height: 120px;
          width: max-content;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
        `}
      >
        <AtomText
          customCSS={css`
            font-size: 16px;
            font-weight: 700;
            color: #272727;
          `}
        >
          {user?.name}
        </AtomText>
        <AtomText
          customCSS={css`
            font-size: 14px;
            font-weight: 500;
            color: #5f5f5f;
          `}
        >
          {comments}
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
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default TagComment;

type PropsSkeleton = {
  key?: string;
  index?: number;
  width?: string;
};

export const TagCommentSkeleton: FC<PropsSkeleton> = (props) => {
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
