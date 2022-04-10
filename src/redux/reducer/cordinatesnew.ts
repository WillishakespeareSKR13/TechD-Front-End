import { Reducer } from 'react';

const TypesReducers = {
  SETCORDINATESNEW: (
    _: CordinatesNewReducerType,
    payload: CordinatesNewReducerType
  ) => payload,
};

type UserAction = {
  type: keyof typeof TypesReducers;
  payload: CordinatesNewReducerType;
};

export type CordinatesNewReducerType = {
  lat: number;
  lng: number;
};

export const initialState: CordinatesNewReducerType = {
  lat: 0,
  lng: 0,
};

const CordinatesNewReducer: Reducer<CordinatesNewReducerType, UserAction> = (
  state = initialState,
  action
) => {
  const { type, payload } = action;
  const TypeReduce = TypesReducers[type];
  const Reduce = TypeReduce ? TypeReduce(state, payload) : state;
  return Reduce;
};

export default CordinatesNewReducer;
