import axios from 'axios';
import { Dispatch } from 'redux';
import { LoginActionTypes } from './types';

const API = 'http://localhost:4000';

export interface ILogin {
  email: string;
  password: string;
}

// Generic dispatch function
export interface LoginMakeAuthAction {
  type: LoginActionTypes.makeLogin;
  payload: string
}

export const makeLogin = (auth: ILogin) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${API}/authenticate`, auth);
      localStorage.setItem('token', response.data.token);
      dispatch<LoginMakeAuthAction>({
        type: LoginActionTypes.makeLogin,
        payload: response.data.token
      });
      window.location.href = '/';
    } catch (e) {
      console.error('Error: ', e);
    }
  }
}
