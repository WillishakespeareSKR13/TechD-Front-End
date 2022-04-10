import { CordinatesReducerType } from '../reducer/cordinates';

export const SetCordinates = (payload: CordinatesReducerType) => ({
  type: 'SETCORDINATES',
  payload,
});
