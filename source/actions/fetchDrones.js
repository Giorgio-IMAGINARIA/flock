import {FETCH_DRONES, SHOW_ERROR} from "../constants/action-types";
// LIBRARY
import {getApiAddress} from '../library/SetClientEnvironment';
// Other libraries
import 'whatwg-fetch';

interface DroneQueryObject {
  droneID: any
}

function fetchDronesFromAPI(objectToSubmit : DroneQueryObject) {

  let route: string = objectToSubmit.droneID === '*'
    ? `api/v0/drones`
    : `/api/v0/drone/${objectToSubmit.droneID}`;

  let address = `${getApiAddress()}${route}`;

  return dispatch => {
    return fetch(address, {method: 'GET'}).then(response => {
      if (!response.ok) {
        let message: string = `Error - ${response.status} - ${response.statusText}`;
        dispatch(dispatchErrorMessage(message))
      };
      return response;
    }).then(response => response.json()).then(json => dispatch(dispatchDrones(json)))
  };
  
};

export const fetchDrones = (droneQueryObjecyPassed : DroneQueryObject) => {
  return(dispatch, getState) => {
    return dispatch(fetchDronesFromAPI(droneQueryObjecyPassed))
  };
};

function dispatchDrones(json) {
  return {type: FETCH_DRONES, payload: json};
};

function dispatchErrorMessage(message) {
  return {type: SHOW_ERROR, payload: message};
};
