import { FC } from 'react';
import { css, Global } from '@emotion/react';
import StylesGlobal from '@sweetsyui/ui/build/@styles/stylesglobal';

const GlobalStyles: FC = () => (
  <>
    <StylesGlobal scrollbarColor="#a2271b" />
    <Global
      styles={css`
        html,
        body {
          background-color: #fff1f1;
        }
        @keyframes skeleton {
          0% {
            background-position: 200% 0%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}
    />
  </>
);

export default GlobalStyles;
