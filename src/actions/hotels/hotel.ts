import axios from 'axios';
import { Dispatch } from 'redux';

import { API_URL } from '../../config';
import { getToken } from '../login';

import { HotelActionTypes } from './types';

export interface Room {
  id: number;
  roomNumber: string;
}

// Generic dispatch function
export interface GetRoomsAction {
  type: HotelActionTypes.getRooms;
  payload: Room[]
}

export const getRooms = () => {
  return async (dispatch: Dispatch) => {
    try {
      const url = `${API_URL['dev'].url}/hotels/rooms?hotel=1`;
      const response = await axios.get<{ hotelrooms: Room[] }>(url, {
        headers: {
          Authorization: getToken
        }
      });
      dispatch<GetRoomsAction>({
        type: HotelActionTypes.getRooms,
        payload: response.data.hotelrooms
      });
    } catch (e) {
      console.error('Error', e);
    }
  }
}
