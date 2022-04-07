import { FC, useEffect, useState } from 'react';
import {
  AtomButton,
  AtomContainer,
  AtomIcon,
  AtomWrapper,
} from '@sweetsyui/ui';
import { css } from '@emotion/react';

const Header: FC = () => {
  const [scroll, setScroll] = useState(false);

  const getScroll = () => {
    setScroll(window.scrollY > 100);
  };

  useEffect(() => {
    function watchScroll() {
      window.addEventListener(`scroll`, getScroll, true);
    }
    watchScroll();
    return () => {
      window.removeEventListener(`scroll`, getScroll, true);
    };
  });
  return (
    <AtomContainer
      as="nav"
      customCSS={css`
        width: 100%;
        justify-content: center;
        align-items: center;
        height: 90px;
        position: fixed;
        z-index: 100;
        background-color: ${scroll ? '#a2271b' : 'transparent'};
        ${scroll &&
        css`
          box-shadow: 0px 0px 10px 5px #00000034;
        `}
        top: 0;
        transition: background-color 0.2s ease-in-out;
      `}
    >
      <AtomWrapper
        customCSS={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          max-width: 1440px;
          padding: 0px 90px;
          @media only screen and (max-width: 980px) {
            padding: 0px 30px;
          }
        `}
      >
        <AtomIcon
          icon="/icons/melp.svg"
          width="100px"
          height="30px"
          color="#ffffff"
        />
        <AtomWrapper
          customCSS={css`
            width: max-content;
            gap: 20px;
            display: flex;
            flex-direction: row;
          `}
        >
          <AtomButton
            customCSS={css`
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: row;
              background-color: transparent;
              font-size: 14px;
              font-weight: 500;
              padding: 10px 30px;
              border-radius: 4px;
            `}
          >
            <AtomIcon
              icon="/icons/star.svg"
              width="15px"
              height="14px"
              color="#ffffff"
              customCSS={css`
                margin: 0px 8px 2px 0px;
              `}
            />
            Recomendaciones
          </AtomButton>
          <AtomButton
            customCSS={css`
              background-color: #ffffff;
              font-size: 14px;
              font-weight: 600;
              padding: 10px 30px;
              border-radius: 4px;
              color: #141414;
            `}
          >
            Login
          </AtomButton>
        </AtomWrapper>
      </AtomWrapper>
    </AtomContainer>
  );
};

export default Header;
