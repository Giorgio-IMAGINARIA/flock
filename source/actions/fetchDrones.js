import {FETCH_DRONES} from "../constants/action-types";

function fetchPosts() {
  return dispatch => {
    let address = `https://bobs-epic-drone-shack-inc.herokuapp.com/api/v0/drones`;
    // return fetch(address, {method: 'GET'}).then(response => response.json()).then(json => dispatch(receivePosts(subreddit, json)))
    return fetch(address, {method: 'GET'}).then(response => response.json()).then(json => {
      console.log('the JSON: ', json);
    })
  };
};

export const fetchDrones = article => {
  console.log('mensolassima');
  return {type: FETCH_DRONES, payload: article};
};
