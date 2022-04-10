import { Reducer } from 'react';

const TypesReducers = {
  SETCORDINATES: (_: CordinatesReducerType, payload: CordinatesReducerType) =>
    payload,
};

type UserAction = {
  type: keyof typeof TypesReducers;
  payload: CordinatesReducerType;
};

export type CordinatesReducerType = {
  lat: number;
  lng: number;
};

export const initialState: CordinatesReducerType = {
  lat: 0,
  lng: 0,
};

const CordinatesReducer: Reducer<CordinatesReducerType, UserAction> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  const TypeReduce = TypesReducers[type];
  const Reduce = TypeReduce ? TypeReduce(state, payload) : state;
  return Reduce;
};

export default CordinatesReducer;
