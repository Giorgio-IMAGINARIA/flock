// @flow
import {combineReducers} from 'redux'
import {FETCH_DRONES, SHOW_ERROR, CLOSE_SNACKBAR} from "../constants/action-types";

const initialState = {
  droneArray: [],
  errorMessage: '',
  snackBarOpenState: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRONES:
      return {
        ...state,
        droneArray: [action.payload]
      };
      break;
    case SHOW_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        snackBarOpenState: true
      };
      break;
    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackBarOpenState: false
      };
      break;
    default:
      return state;
  }
};

export default rootReducer;
