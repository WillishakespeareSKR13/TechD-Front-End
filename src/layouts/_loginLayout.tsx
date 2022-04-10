import { FC } from 'react';
import LayoutAnimation from '@sweetsyui/ui/build/@layouts/LayoutAnimation';
import AuthContext from '@Src/hooks/authContext';
import { AtomContainer } from '@sweetsyui/ui';
import { css } from '@emotion/react';

type Props = {
  Role?: string | string[];
};

const DefaultLayout: FC<Props> = ({ children }) => (
  <AuthContext type="LOGIN">
    <LayoutAnimation
      minHeight="100vh"
      height="max-content"
      backgroundColor="transparent"
    >
      <AtomContainer
        as="main"
        minHeight="100vh"
        height="100%"
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor="#fff1f1"
        customCSS={css`
          background: linear-gradient(
              0deg,
              rgba(1, 11, 1, 0.7) 0%,
              rgba(79, 29, 29, 0.5) 50%
            ),
            url('/images/back.jpg');
        `}
      >
        {children}
      </AtomContainer>
    </LayoutAnimation>
  </AuthContext>
);
export default DefaultLayout;
