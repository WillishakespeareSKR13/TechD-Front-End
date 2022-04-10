import { FC, useEffect, useState } from 'react';
import {
  AtomButton,
  AtomContainer,
  AtomIcon,
  AtomWrapper,
} from '@sweetsyui/ui';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@Src/redux/reducer';
import { Logout } from '@Src/redux/actions/user';
import Sidebar from './sidebar';

type props = {
  backgroundColor?: string;
};

const Header: FC<props> = (props) => {
  const { backgroundColor } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.user);
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
        background-color: ${scroll
          ? '#a2271b'
          : backgroundColor ?? 'transparent'};
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
        <AtomButton
          onClick={() => {
            router.push('/');
          }}
          customCSS={css`
            display: flex;
            padding: 0px;
            background-color: transparent;
          `}
        >
          <AtomIcon
            icon="/icons/melp.svg"
            width="100px"
            height="30px"
            color="#ffffff"
          />
        </AtomButton>
        <Sidebar />
        <AtomWrapper
          customCSS={css`
            width: max-content;
            gap: 20px;
            display: flex;
            flex-direction: row;
            @media only screen and (max-width: 980px) {
              display: none;
            }
          `}
        >
          <AtomButton
            onClick={() => {
              router.push('/recommendations');
            }}
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
          {user?.id ? (
            <>
              <AtomButton
                onClick={() => {
                  router.push('/feed');
                }}
                customCSS={css`
                  border: 1px solid #ffffff;
                  color: #ffffff;
                  background-color: transparent;
                  font-size: 14px;
                  font-weight: 600;
                  padding: 8px 30px;
                  border-radius: 4px;
                `}
              >
                Feed
              </AtomButton>
              <AtomButton
                onClick={() => {
                  dispatch(Logout());
                  location.reload();
                }}
                customCSS={css`
                  border: 1px solid #ffffff;
                  background-color: #ffffff;
                  font-size: 14px;
                  font-weight: 600;
                  padding: 8px 30px;
                  border-radius: 4px;
                  color: #141414;
                `}
              >
                Cerrar Sesión
              </AtomButton>
            </>
          ) : (
            <>
              <AtomButton
                onClick={() => {
                  router.push('/register');
                }}
                customCSS={css`
                  border: 1px solid #ffffff;
                  color: #ffffff;
                  background-color: transparent;
                  font-size: 14px;
                  font-weight: 600;
                  padding: 8px 30px;
                  border-radius: 4px;
                `}
              >
                Registrate
              </AtomButton>
              <AtomButton
                onClick={() => {
                  router.push('/login');
                }}
                customCSS={css`
                  background-color: #ffffff;
                  font-size: 14px;
                  font-weight: 600;
                  padding: 10px 30px;
                  border-radius: 4px;
                  color: #141414;
                `}
              >
                Iniciar Sesión
              </AtomButton>
            </>
          )}
        </AtomWrapper>
      </AtomWrapper>
    </AtomContainer>
  );
};

export default Header;
