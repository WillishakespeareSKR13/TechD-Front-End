import { css } from '@emotion/react';
import { AtomIcon, AtomText, AtomWrapper } from '@sweetsyui/ui';
import React from 'react';

type Props = {
  icon: string;
  title: string;
  description: string;
  index?: number;
};

const TagInfo = (props: Props) => {
  const { icon, title, description, index } = props;
  return (
    <AtomWrapper
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        flex-basis: 30%;
        flex-grow: 1;
        background-color: #fff;
        border-radius: 8px;
        padding: 30px 20px;
        box-shadow: 0px 100px 80px rgba(220, 64, 64, 0.07),
          0px 41.7776px 33.4221px rgba(220, 64, 64, 0.0503198),
          0px 22.3363px 17.869px rgba(220, 64, 64, 0.0417275),
          0px 12.5216px 10.0172px rgba(220, 64, 64, 0.035),
          0px 6.6501px 5.32008px rgba(220, 64, 64, 0.0282725),
          0px 2.76726px 2.21381px rgba(220, 64, 64, 0.0196802);
      `}
    >
      <AtomIcon height="40px" width="40px" icon={icon} />
      <AtomText
        customCSS={css`
          font-size: 16px;
          font-weight: bold;
        `}
      >
        {title}
      </AtomText>
      <AtomText
        customCSS={css`
          font-size: 14px;
          font-weight: 400;
        `}
      >
        {description}
      </AtomText>
    </AtomWrapper>
  );
};

export default TagInfo;
