//@flow
import { FETCH_DRONES, CHANGE_SNACKBAR } from "../constants/action-types";
// LIBRARY
import { getApiAddress } from '../library/SetClientEnvironment';
// Other libraries
import 'whatwg-fetch';

type DroneQueryObject = {
  droneID: string | number
};

type DroneObtainedObject = {
  currency: string,
  droneId: number,
  name: string,
  numCrashes: number,
  numFlights: number,
  price: number
};

type snackBarStateObjectInterface = {
  errorMessage: { message: string },
  snackBarOpenState: { openState: boolean }
};

type errorMessageActionObject = {
  type: CHANGE_SNACKBAR,
  payload: snackBarStateObjectInterface
};

type finalDroneActionObject = {
  type: FETCH_DRONES,
  payload: Array<DroneObtainedObject>
};

export const fetchDrones = (droneQueryObjecyPassed: DroneQueryObject) => {
  return (dispatch: ((DroneQueryObject) => Promise<any>) => void): void => dispatch(fetchDronesFromAPI(droneQueryObjecyPassed));
};

export const dispatchDrones = (json: Array<DroneObtainedObject>): finalDroneActionObject => ({ type: FETCH_DRONES, payload: json });

export const dispatchErrorMessage = (messageObject: snackBarStateObjectInterface): errorMessageActionObject => ({ type: CHANGE_SNACKBAR, payload: messageObject });

export const fetchDronesFromAPI = (objectToSubmit: DroneQueryObject) => {
  let route: string = objectToSubmit.droneID === '*'
    ? `api/v0/drones`
    : `/api/v0/drone/${objectToSubmit.droneID}`;
  let address = `${getApiAddress()}${route}`;
  return (dispatch: any): any => {
    return fetch(address, { method: 'GET' })
      .then(response => {
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
      })
      .then(response => response.json())
      .then(json => {
        let arrayToDispatch = [];
        objectToSubmit.droneID === '*'
          ? arrayToDispatch = [...json]
          : arrayToDispatch.push(json);
        dispatch(dispatchDrones(arrayToDispatch))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};