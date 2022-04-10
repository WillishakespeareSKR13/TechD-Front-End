import { CordinatesNewReducerType } from '../reducer/cordinatesnew';

export const SetCordinatesNew = (payload: CordinatesNewReducerType) => ({
  type: 'SETCORDINATESNEW',
  payload,
});
