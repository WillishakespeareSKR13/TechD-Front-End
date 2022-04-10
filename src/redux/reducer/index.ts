import { combineReducers } from 'redux';
import SideBarReducer, { SidebarReducerType } from './sidebar';
import UserReducer, { UserReducerType } from './user';
import CordinatesReducer, { CordinatesReducerType } from './cordinates';
import CordinatesNewReducer, {
  CordinatesNewReducerType,
} from './cordinatesnew';

const RootReducer = combineReducers({
  user: UserReducer,
  sideBar: SideBarReducer,
  cordinates: CordinatesReducer,
  cordinatesNew: CordinatesNewReducer,
});

export type RootStateType = {
  user: UserReducerType;
  sideBar: SidebarReducerType;
  cordinates: CordinatesReducerType;
  cordinatesNew: CordinatesNewReducerType;
};

export default RootReducer;
