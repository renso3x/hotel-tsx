import {
  Room,
  HotelActions,
  HotelActionTypes
} from '../actions/hotels';

export interface HotelState {
  rooms: Room[];
}

const initialState = {
  rooms: []
}

export const hotelReducer = (
  state: HotelState = initialState,
  action: HotelActions
) => {

  switch (action.type) {

    case HotelActionTypes.getRooms:
      return { ...state, rooms: action.payload };

    default:
      return state;
  }
}