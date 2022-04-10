import { useMutation } from '@apollo/client';
import { css } from '@emotion/react';
import { NEWRESTAURANT } from '@Src/apollo/client/mutation/restaurants';
import AtomMapNew from '@Src/components/@atoms/AtomMapNew';
import { useAlert } from '@Src/hooks/alertContext';

import { RootStateType } from '@Src/redux/reducer';
import {
  AtomButton,
  AtomInput,
  AtomLoader,
  AtomSeo,
  AtomText,
  AtomWrapper,
  uploadImage,
} from '@sweetsyui/ui';
import { useFormik } from 'formik';
import { NextPageFC } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

const index: NextPageFC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { insertAlert } = useAlert();
  const [EXENEWRESTAURANT] = useMutation(NEWRESTAURANT, {
    onCompleted: () => {
      insertAlert({
        id: 'newRestaurant',
        type: 'success',
        message: 'Restaurant created successfully',
      });
      router.push('/feed');
    },
    onError: () => {
      setLoading(false);
      insertAlert({
        id: 'newRestaurantError',
        type: 'error',
        message: 'Error creating restaurant',
      });
    },
  });
  const cordinatesNew = useSelector(
    (state: RootStateType) => state.cordinatesNew
  );
  const user = useSelector((state: RootStateType) => state.user);
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      neighborhood: '',
      photo: {} as File,
      cuisine_type: '',
      operating_hours: {
        Monday: '8:00am - 6:00 pm',
        Tuesday: '8:00am - 6:00 pm',
        Wednesday: '8:00am - 6:00 pm',
        Thursday: '8:00am - 6:00 pm',
        Friday: '8:00am - 6:00 pm',
        Saturday: '8:00am - 6:00 pm',
        Sunday: '8:00am - 6:00 pm',
      },
      latlng: {
        lat: cordinatesNew.lat,
        lng: cordinatesNew.lng,
      },
      reviews: [],
      company: user?.id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      address: Yup.string().required('Required'),
      neighborhood: Yup.string().required('Required'),
      photo: Yup.mixed()
        .required('Required')
        .test('photo', 'Photo is required', (value) => value.name),
      cuisine_type: Yup.string().required('Required'),
      operating_hours: Yup.object({
        Monday: Yup.string().required('Required'),
        Tuesday: Yup.string().required('Required'),
        Wednesday: Yup.string().required('Required'),
        Thursday: Yup.string().required('Required'),
        Friday: Yup.string().required('Required'),
        Saturday: Yup.string().required('Required'),
        Sunday: Yup.string().required('Required'),
      }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      EXENEWRESTAURANT({
        variables: {
          input: {
            ...values,
            photo: await uploadImage(values.photo, {
              name: 'test',
              orgcode: 'TST-0001',
            }),
          },
        },
      });
    },
  });

  return (
    <>
      <AtomSeo
        page="Home"
        title="Melp"
        website="https://melp.vercel.app/"
        icon="/favicon.png"
      />
      <AtomWrapper
        customCSS={css`
          align-items: center;
          justify-content: center;
          padding: 140px 0px 100px 0px;
          background: linear-gradient(
              0deg,
              rgba(1, 11, 1, 0.7) 0%,
              rgba(79, 29, 29, 0.5) 50%
            ),
            url('/images/search.webp');
          position: relative;
          background-size: cover;
        `}
      >
        <AtomWrapper
          customCSS={css`
            max-width: 1440px;
            height: 100%;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 0px 90px;
            gap: 18px;
            @media only screen and (max-width: 980px) {
              padding: 0px 30px;
            }
          `}
        >
          <AtomText
            customCSS={css`
              font-size: 40px;
              color: #ffffff;
              font-weight: bold;
              line-height: 50px;
            `}
          >
            Agrega un restaurante
          </AtomText>
        </AtomWrapper>
      </AtomWrapper>
      <AtomWrapper
        customCSS={css`
          max-width: 1440px;
          min-height: calc(100vh - 90px);
          height: 100%;
          flex-direction: row;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 40px;
          padding: 0px 90px 90px 90px;
          @media only screen and (max-width: 980px) {
            padding: 0px 30px 30px 30px;
          }
        `}
      >
        <AtomWrapper
          customCSS={css`
            width: 100%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomText
            customCSS={css`
              margin-top: 5px;
              font-size: 28px;
              color: #292929;
              font-weight: bold;
              line-height: 50px;
            `}
          >
            Marca el lugar donde está ubicado tu restaurante
          </AtomText>
          <AtomMapNew
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBogrrOMSmXlcjuqv127MDoOVlw55ykqYY&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div style={{ height: `500px`, width: '100%' }} />
            }
            mapElement={<div style={{ height: `100%` }} />}
          />
          <AtomWrapper
            customCSS={css`
              width: 100%;
              padding: 25px 0px;
              gap: 20px;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-between;
            `}
          >
            <AtomInput
              id="name"
              formik={formik}
              label="Nombre"
              labelFontSize="14px"
              labelFontWeight="600"
              labelColor="#353535"
              labelWidth="48%"
              spanMargin="0px 0px 10px 0px"
            />
            <AtomInput
              id="address"
              formik={formik}
              label="Dirección"
              labelFontSize="14px"
              labelFontWeight="600"
              labelColor="#353535"
              labelWidth="48%"
              spanMargin="0px 0px 10px 0px"
            />
            <AtomInput
              id="neighborhood"
              formik={formik}
              label="Barrio"
              labelFontSize="14px"
              labelFontWeight="600"
              labelColor="#353535"
              labelWidth="48%"
              spanMargin="0px 0px 10px 0px"
            />
            <AtomInput
              id="cuisine_type"
              formik={formik}
              label="Tipo de comida"
              labelFontSize="14px"
              labelFontWeight="600"
              labelColor="#353535"
              labelWidth="48%"
              spanMargin="0px 0px 10px 0px"
            />
          </AtomWrapper>
        </AtomWrapper>
        <AtomWrapper
          customCSS={css`
            width: 30%;
            padding: 25px 0px;
            gap: 20px;
          `}
        >
          <AtomButton
            customCSS={css`
              width: 100%;
              background-color: #a2271b;
              padding: 10px 0px;
              margin-top: 5px;
              font-size: 14px;
              font-weight: bold;
            `}
            onClick={() => formik.handleSubmit()}
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
              'Guardar'
            )}
          </AtomButton>
          <AtomInput
            id="photo"
            formik={formik}
            width="100%"
            labelWidth="100%"
            type="dragdrop"
            label="Imagen"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomText
            customCSS={css`
              margin-top: 5px;
              font-size: 18px;
              color: #292929;
              font-weight: bold;
            `}
          >
            Horarios
          </AtomText>
          <AtomInput
            id="operating_hours.Monday"
            formik={formik}
            label="Lunes"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomInput
            id="operating_hours.Tuesday"
            formik={formik}
            label="Martes"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomInput
            id="operating_hours.Wednesday"
            formik={formik}
            label="Miércoles"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomInput
            id="operating_hours.Thursday"
            formik={formik}
            label="Jueves"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomInput
            id="operating_hours.Friday"
            formik={formik}
            label="Viernes"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomInput
            id="operating_hours.Saturday"
            formik={formik}
            label="Sábado"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
          <AtomInput
            id="operating_hours.Sunday"
            formik={formik}
            label="Domíngo"
            placeholderColor="#cacaca"
            placeholder="11:30 am - 10:00 pm"
            labelFontSize="14px"
            labelFontWeight="600"
            labelColor="#353535"
            labelWidth="100%"
            spanMargin="0px 0px 10px 0px"
          />
        </AtomWrapper>
      </AtomWrapper>
    </>
  );
};

export default index;

index.Layout = 'public';
