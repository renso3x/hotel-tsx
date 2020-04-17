import { combineReducers } from 'redux';
import { loginReducer, ILoginState } from './login';

interface IRootState {
  login: ILoginState
}

export const rootReducers = combineReducers<IRootState>({
  login: loginReducer
});