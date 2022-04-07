import { FC } from 'react';
import {
  AtomContainer,
  AtomIcon,
  AtomLink,
  AtomSeparator,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import { css } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';

const socialNetworks = [
  {
    id: uuidv4(),
    icon: '/icons/social/facebook.svg',
    link: 'https://www.facebook.com/',
  },
  {
    id: uuidv4(),
    icon: '/icons/social/twitter.svg',
    link: 'https://www.twitter.com/',
  },
  {
    id: uuidv4(),
    icon: '/icons/social/youtube.svg',
    link: 'https://www.youtube.com/',
  },
];

const Footer: FC = () => {
  return (
    <AtomContainer
      as="footer"
      customCSS={css`
        width: 100%;
        justify-content: center;
        align-items: center;
        transition: background-color 0.1s ease-in-out;
      `}
    >
      <AtomWrapper
        customCSS={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          max-width: 1440px;
          padding: 180px 90px;
          gap: 50px;
          @media only screen and (max-width: 980px) {
            padding: 120px 30px;
          }
        `}
      >
        <AtomWrapper
          customCSS={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            @media only screen and (max-width: 980px) {
              flex-direction: column;
              gap: 40px;
            }
          `}
        >
          <AtomLink
            customCSS={css`
              font-size: 16px;
              font-weight: 500;
            `}
          >
            Recomendaciones
          </AtomLink>
          <AtomIcon
            icon="/icons/melp.svg"
            width="140px"
            height="50px"
            color="#4f4c4c"
          />
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-direction: row;
              width: max-content;
              gap: 70px;
            `}
          >
            {socialNetworks.map(({ id, icon, link }) => (
              <AtomLink
                key={id}
                href={link}
                customCSS={css`
                  font-size: 16px;
                  font-weight: 500;
                `}
              >
                <AtomIcon width="24px" height="24px" icon={icon} />
              </AtomLink>
            ))}
          </AtomWrapper>
        </AtomWrapper>
        <AtomSeparator height="1px" color="#d5d8dc" margin="0px 0px" />
        <AtomWrapper
          customCSS={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            @media only screen and (max-width: 980px) {
              flex-direction: column;
              gap: 40px;
            }
          `}
        >
          <AtomText
            customCSS={css`
              font-size: 14px;
            `}
          >
            © 2021 Melp. Todos los derechos reservados.
          </AtomText>
          <AtomWrapper
            customCSS={css`
              display: flex;
              flex-direction: row;
              width: max-content;
              gap: 50px;
            `}
          >
            <AtomLink
              customCSS={css`
                font-size: 14px;
                font-weight: 500;
              `}
            >
              Terminos de Servicio
            </AtomLink>
            <AtomLink
              customCSS={css`
                font-size: 14px;
                font-weight: 500;
              `}
            >
              Politica de privacidad
            </AtomLink>
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </AtomContainer>
  );
};

export default Footer;
