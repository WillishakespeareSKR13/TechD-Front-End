import { FC, useState } from 'react';
import { AtomButton, AtomIcon, AtomWrapper } from '@sweetsyui/ui';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@Src/redux/reducer';
import { Logout } from '@Src/redux/actions/user';
import { AnimatePresence } from 'framer-motion';

const Sidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootStateType) => state.user);
  return (
    <>
      <AtomButton
        onClick={() => setOpen(!open)}
        customCSS={css`
          display: none;
          padding: 0;
          background-color: transparent;
          @media only screen and (max-width: 980px) {
            display: flex;
          }
        `}
      >
        <AtomIcon icon="/icons/menu.svg" color="white" />
      </AtomButton>
      <AnimatePresence exitBeforeEnter>
        {open && (
          <AtomWrapper
            initial={{
              x: 20,
              opacity: 0,
            }}
            exit={{
              x: 20,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
            }}
            customCSS={css`
              display: none;
              position: fixed;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              max-width: 350px;
              width: 100%;
              height: 100vh;
              top: 0;
              right: 0;
              z-index: -1;
              background-color: #a2271b;
              padding: 120px 30px 30px 30px;
              gap: 50px;
              @media only screen and (max-width: 980px) {
                display: flex;
              }
            `}
          >
            <AtomButton
              onClick={() => {
                router.push('/recommendations');
              }}
              customCSS={css`
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                background-color: #ffffff;
                color: #a2271b;
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
                color="#a2271b"
                customCSS={css`
                  margin: 0px 8px 2px 0px;
                `}
              />
              Recomendaciones
            </AtomButton>
            <AtomWrapper
              customCSS={css`
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 20px;
              `}
            >
              {user?.id ? (
                <>
                  <AtomButton
                    onClick={() => {
                      router.push('/feed');
                    }}
                    customCSS={css`
                      width: 100%;
                      background-color: #ffffff;
                      color: #ffffff;
                      border: 1px solid #ffffff;
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
                      width: 100%;
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
                      width: 100%;
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
                      width: 100%;
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
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
