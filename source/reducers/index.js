// @flow
import {combineReducers} from 'redux'
import {ADD_ARTICLE, DELETE_ALL_ARTICLES, FETCH_DRONES, SHOW_ERROR, CLOSE_SNACKBAR} from "../constants/action-types";

const initialState = {
  articles: [],
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
    case ADD_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles,
          action.payload
        ]
      };
      break;
    case DELETE_ALL_ARTICLES:
      return {
        ...state,
        articles: []
      };
      break;
    default:
      return state;
  }
};

export default rootReducer;
