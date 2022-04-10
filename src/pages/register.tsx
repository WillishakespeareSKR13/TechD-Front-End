import { useMutation } from '@apollo/client';
import { css } from '@emotion/react';
import {
  AtomButton,
  AtomImage,
  AtomInput,
  AtomLink,
  AtomLoader,
  AtomSeo,
  AtomText,
  AtomWrapper,
} from '@sweetsyui/ui';
import { useFormik } from 'formik';
import { IMutationFilter } from 'graphql';
import { NextPageFC } from 'next';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { NEWUSER } from '@Src/apollo/client/mutation/users';
import { useAlert } from '@Src/hooks/alertContext';
import { useRouter } from 'next/router';

const index: NextPageFC = () => {
  const router = useRouter();
  const { insertAlert } = useAlert();
  const [EXECREATEUSER, { loading }] = useMutation<IMutationFilter<'newUser'>>(
    NEWUSER,
    {
      onError: (error) => {
        insertAlert({
          id: uuidv4(),
          type: 'error',
          message: error.message,
        });
      },
      onCompleted: () => {
        router.push('/login');
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      password: Yup.string().required(),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Las contraseñas no coinciden'
      ),
    }),
    onSubmit: (values) => {
      EXECREATEUSER({
        variables: {
          input: {
            email: values.email,
            name: values.name,
            password: values.password,
          },
        },
      });
    },
  });
  return (
    <>
      <AtomSeo
        page="Login"
        title="Melp"
        website="https://melp.vercel.app/"
        icon="/favicon.png"
      />
      <AtomWrapper
        customCSS={css`
          width: 100%;
          backdrop-filter: blur(10px);
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <AtomWrapper
          customCSS={css`
            align-items: center;
            max-width: 400px;
            padding: 40px 30px;
            border-radius: 8px;
            background-color: #ffffff;
          `}
        >
          <AtomImage
            src="/images/logo.png"
            alt="logo"
            customCSS={css`
              width: 80px;
              height: 80px;
              margin: -80px 0px 0px 0px;
            `}
          />
          <AtomText
            customCSS={css`
              margin-top: 10px;
              font-weight: 700;
              font-size: 28px;
              color: #363232;
            `}
          >
            Registrate en Melp
          </AtomText>
          <AtomInput
            id="email"
            formik={formik}
            labelWidth="100%"
            label="Email"
            labelFontSize="14px"
            labelPadding="0px 0px 20px 0px"
            height="40px"
            labelFontWeight="600"
            labelColor="#363232"
            border="1px solid #b4b1b1"
            margin="0px 0px 5px 0px"
          />
          <AtomInput
            id="name"
            formik={formik}
            labelWidth="100%"
            label="Nombre"
            labelFontSize="14px"
            labelPadding="0px 0px 20px 0px"
            height="40px"
            labelFontWeight="600"
            labelColor="#363232"
            border="1px solid #b4b1b1"
            margin="0px 0px 5px 0px"
          />
          <AtomInput
            id="password"
            formik={formik}
            labelWidth="100%"
            label="Contraseña"
            height="40px"
            labelFontWeight="600"
            labelColor="#363232"
            labelFontSize="14px"
            labelPadding="0px 0px 20px 0px"
            border="1px solid #b4b1b1"
            margin="0px 0px 5px 0px"
          />
          <AtomInput
            id="confirmPassword"
            formik={formik}
            labelWidth="100%"
            label="Contraseña"
            height="40px"
            labelFontWeight="600"
            labelColor="#363232"
            labelFontSize="14px"
            labelPadding="0px 0px 20px 0px"
            border="1px solid #b4b1b1"
            margin="0px 0px 5px 0px"
          />
          <AtomText>
            Ya tienes una cuenta?{' '}
            <AtomLink link="/login" color="#d82c2c">
              inicia sesión
            </AtomLink>
          </AtomText>
          <AtomText>o</AtomText>
          <AtomText>
            Tienes un negocio?{' '}
            <AtomLink link="/registerCompany" color="#d82c2c">
              Registralo
            </AtomLink>
          </AtomText>
          <AtomButton
            onClick={() => {
              formik.handleSubmit();
            }}
            customCSS={css`
              margin-top: 20px;
              width: 100%;
              padding: 12px 0px;
              font-size: 14px;
              background-color: #d82c2c;
            `}
          >
            {loading ? (
              <AtomLoader
                width="100%"
                type="small"
                isLoading
                colorLoading="white"
                widthLoader="2px"
                customCSS={css`
                  .lds-ring {
                    transform: translate(-40%, -45%);
                    width: 18px;
                    height: 18px;
                    div {
                      width: 18px;
                      height: 18px;
                    }
                  }
                `}
              />
            ) : (
              'Registrarte'
            )}
          </AtomButton>
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default index;

index.Layout = 'login';
