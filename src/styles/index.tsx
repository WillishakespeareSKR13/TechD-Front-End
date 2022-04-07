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
      `}
    />
  </>
);

export default GlobalStyles;
