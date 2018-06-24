// @flow
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

import { FETCH_DRONES, CHANGE_SNACKBAR } from "../../source/constants/action-types";
import { dispatchDrones, dispatchErrorMessage } from "../../source/actions/fetchDrones"


const dummyDroneObtainedArray: Array<DroneObtainedObject> = [{
    currency: 'dummyCurrency',
    droneId: 1,
    name: 'dummyName',
    numCrashes: 1,
    numFlights: 1,
    price: 1
}];

describe('fetchDrones action - dispatchDrones()', () => {
    it('should create an action to set the current state of the requested drones', () => {
        const expectedAction = {
            type: FETCH_DRONES, payload: dummyDroneObtainedArray
        }
        expect(dispatchDrones(dummyDroneObtainedArray)).toEqual(expectedAction)
    })
})