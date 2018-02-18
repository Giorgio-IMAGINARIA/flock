import {FETCH_DRONES} from "../constants/action-types";
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface DroneQueryObject {
  droneID: any
}

function fetchDronesFromAPI(objectToSubmit : DroneQueryObject) {

  console.log('objectToSubmit: ', objectToSubmit);

  let route: string = objectToSubmit.droneID === '*'
  ? `api/v0/drones`
  : `/api/v0/drone/${objectToSubmit.droneID}`;

  let address = `${StoreAddress.getAddressRoot()}${route}`;
  console.log('address: ', address);

  return dispatch => {

    return fetch(address, {method: 'GET'}).then(response => response.json()).then(json => {
      dispatch(dispatchDrones(json))
    })
  };
};

export const fetchDrones = (droneQueryObjecyPassed : DroneQueryObject) => {
  return(dispatch, getState) => {
    return dispatch(fetchDronesFromAPI(droneQueryObjecyPassed))
  };
};

function dispatchDrones(json) {
  console.log('the JSON: ', json);
  return {
    type: FETCH_DRONES,
    payload: json
  };
};
