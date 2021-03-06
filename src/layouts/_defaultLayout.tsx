import { FC } from 'react';
import LayoutAnimation from '@sweetsyui/ui/build/@layouts/LayoutAnimation';
import Header from '@Src/components/@organisms/header';
import AuthContext from '@Src/hooks/authContext';
import { AtomContainer } from '@sweetsyui/ui';
import Footer from '@Src/components/@organisms/footer';

type Props = {
  Role?: string | string[];
};

const DefaultLayout: FC<Props> = ({ children }) => (
  <AuthContext type="DEFAULT">
    <LayoutAnimation
      minHeight="100vh"
      height="max-content"
      backgroundColor="transparent"
    >
      <Header />
      <AtomContainer
        as="main"
        minHeight="100vh"
        height="100%"
        alignItems="center"
        justifyContent="flex-start"
        backgroundColor="#fff1f1"
      >
        {children}
      </AtomContainer>
      <Footer />
    </LayoutAnimation>
  </AuthContext>
);
export default DefaultLayout;
