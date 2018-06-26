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

export const fetchDrones =
  (droneQueryObjecyPassed: DroneQueryObject): (((() => void)) => void)=>
((dispatch: ((DroneQueryObject) => Promise<void>) => void): void =>
  dispatch(fetchDronesFromAPI(droneQueryObjecyPassed)));

export const dispatchDrones = (json: Array<DroneObtainedObject>): finalDroneActionObject => ({ type: FETCH_DRONES, payload: json });

export const dispatchErrorMessage = (messageObject: snackBarStateObjectInterface): errorMessageActionObject => ({ type: CHANGE_SNACKBAR, payload: messageObject });

export const fetchDronesFromAPI = (objectToSubmit: DroneQueryObject) => {
  let route: string = objectToSubmit.droneID === '*'
    ? `api/v0/drones`
    : `/api/v0/drone/${objectToSubmit.droneID}`;
  let address: string = `${getApiAddress()}${route}`;
  return (dispatch: any): Promise<void> => {
    return fetch((address: string), { method: 'GET' })
      .then((response: any) => {
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
      .then((response: any): any => response.json())
      .then((json: any): void => {
        let arrayToDispatch: Array<DroneObtainedObject> = [];
        objectToSubmit.droneID === '*'
          ? arrayToDispatch = [...json]
          : arrayToDispatch.push(json);
        dispatch(dispatchDrones(arrayToDispatch))
      })
      .catch((error: string): void => {
        console.log(error);
      });
  };
};