import {FETCH_DRONES} from "../constants/action-types";

function fetchDronesFromAPI() {
  return dispatch => {
    let address = `https://api.github.com/repos/atom/atom/issues`;
    return fetch(address, {method: 'GET'}).then(response => response.json()).then(json => {
      dispatch(dispatchDrones(json))
    })
  };
};

export const fetchDrones = article => {
  return(dispatch) => {
    return dispatch(fetchDronesFromAPI())
  };
};

function dispatchDrones(json) {
  console.log('the JSON: ', json);
  return {
    type: FETCH_DRONES,
    payload: {
      name: 'React Redux Tutorial for Beginners',
      id: 1
    }
  };
};
