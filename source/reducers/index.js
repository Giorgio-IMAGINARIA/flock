// @flow
import {FETCH_DRONES, CHANGE_SNACKBAR} from "../constants/action-types";

const initialState = {
  droneArray: [],
  errorMessage: {
    message: ''
  },
  snackBarOpenState: {
    openState: false
  }
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DRONES:
      return {
        ...state,
        droneArray: [...action.payload]
      };
      break;
    case CHANGE_SNACKBAR:
      return {
        ...state,
        errorMessage: {
          ...action.payload.errorMessage
        },
        snackBarOpenState: {
          ...action.payload.snackBarOpenState
        }
      };
      break;
    default:
      return state;
  }
};

export default rootReducer;
