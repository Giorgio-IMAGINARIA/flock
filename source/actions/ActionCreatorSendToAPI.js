// @flow
// Dispatcher
import AppDispatcher from '../dispatcher/AppDispatcher';
// Stores
import StoreAddress from '../stores/StoreAddress';
// Other libraries
import 'whatwg-fetch';

interface ActionObject {
  type: string,
  parameter: Array<any>
}

interface ActionErrorObject {
  type: string,
  parameter: string
}

interface DroneObject {
  droneID: any
}

export default function(objectToSubmit : DroneObject): void {

  let route: string = objectToSubmit.droneID === '*'
    ? `api/v0/drones`
    : `/api/v0/drone/${objectToSubmit.droneID}`

  let address = `${StoreAddress.getAddressRoot()}${route}`;
  fetch(address, {method: 'GET'}).then(handleErrors).then((response) => {
    return response.json()
  }).then((objectRetrieved) => {
    let arrayToreturn: Array<any> = Array.isArray(objectRetrieved)
      ? objectRetrieved
      : [objectRetrieved];
    dispatchAction(arrayToreturn);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function handleErrors(response : any): any {
  if (!response.ok) {
    let message: string = `Error - ${response.status} - ${response.statusText}`;
    dispatchErrorAction(message);
  }
  return response;
}

function dispatchAction(parameter : Array<any>) {
  let Action: ActionObject = {
    type: 'update_drone_array',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}

function dispatchErrorAction(parameter : string) {
  let Action: ActionErrorObject = {
    type: 'api_error',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
