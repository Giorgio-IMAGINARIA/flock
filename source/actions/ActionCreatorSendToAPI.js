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

interface DroneObject {
  droneID: any
}

export default function(objectToSubmit : DroneObject): void {
  console.log('objectToSubmit: ', objectToSubmit);

  let route: string = objectToSubmit.droneID === '*'
    ? `api/v0/drones`
    : `/api/v0/drone/${objectToSubmit.droneID}`

  let address = `${StoreAddress.getAddressRoot()}${route}`;
  fetch(address, {method: 'GET'}).then((response) => {
    return response.json()
  }).then((objectRetrieved) => {
    let arrayToreturn:Array<any> = Array.isArray(objectRetrieved)?
    objectRetrieved:
    [objectRetrieved];

    dispatchAction(arrayToreturn);
  }).catch((ex) => {
    console.error('parsing failed', ex);
    return false;
  });
}

function dispatchAction(parameter : Array<any>) {
  let Action: ActionObject = {
    type: 'update_drone_array',
    parameter: parameter
  };
  AppDispatcher.dispatch(Action);
}
