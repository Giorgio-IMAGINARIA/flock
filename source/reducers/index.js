import {combineReducers} from 'redux'
import {ADD_ARTICLE, DELETE_ALL_ARTICLES} from "../constants/action-types";

const initialState = {
  articles: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
