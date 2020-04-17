import { LoginAction, LoginActionTypes } from '../actions/login';

export interface ILoginState {
  isAuthenticated: boolean;
  token: string
}

const initialState = {
  isAuthenticated: false,
  token: ''
}

export const loginReducer = (state: ILoginState = initialState, action: LoginAction) => {
  switch (action.type) {

    case LoginActionTypes.makeLogin:
      return { ...state, isAuthenticated: true, token: action.payload };

    default:
      return state;
  }
}