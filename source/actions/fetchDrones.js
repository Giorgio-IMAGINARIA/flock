import {FETCH_DRONES, CHANGE_SNACKBAR} from "../constants/action-types";
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
        dispatch(dispatchErrorMessage({
          errorMessage: {
            message: message
          },
          snackBarOpenState: {
            openState: true
          }
        }))
      };
      return response;
    }).then(response => response.json()).then(json => {
      let arrayToDispatch = [];
      objectToSubmit.droneID === '*'
        ? arrayToDispatch = [...json]
        : arrayToDispatch.push(json);
      dispatch(dispatchDrones(arrayToDispatch))
    }).catch((error) => {
      console.log(error);
    });
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

function dispatchErrorMessage(messageObject) {
  return {type: CHANGE_SNACKBAR, payload: messageObject};
};
