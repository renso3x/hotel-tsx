import { combineReducers } from 'redux';
import { loginReducer, ILoginState } from './login';
import { hotelReducer, HotelState } from './hotel';

export interface IRootState {
  login: ILoginState,
  hotel: HotelState
}

export const rootReducers = combineReducers<IRootState>({
  login: loginReducer,
  hotel: hotelReducer
});