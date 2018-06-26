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

type snackBarStateObjectInterface = {
    errorMessage: { message: string },
    snackBarOpenState: { openState: boolean }
};

import { FETCH_DRONES, CHANGE_SNACKBAR } from "../../source/constants/action-types";
import { dispatchDrones, dispatchErrorMessage, fetchDrones } from "../../source/actions/fetchDrones"


const dummyDroneObtainedArray: Array<DroneObtainedObject> = [{
    currency: 'dummyCurrency',
    droneId: 1,
    name: 'dummyName',
    numCrashes: 1,
    numFlights: 1,
    price: 1
}];

describe('fetchDrones action - all methods work', () => {
    it('should create an action to set the current state of the requested drones by calling dispatchDrones()', () => {
        const expectedAction = {
            type: FETCH_DRONES, payload: dummyDroneObtainedArray
        }
        expect(dispatchDrones(dummyDroneObtainedArray)).toEqual(expectedAction)
    });
    it('should create an action to set the snackbar state with an error message by calling dispatchErrorMessage()', () => {
        const dummyErrorMessage: snackBarStateObjectInterface = {
            errorMessage: { message: 'dummyErrorMessageText' },
            snackBarOpenState: { openState: true }
        }
        const expectedAction = {
            type: CHANGE_SNACKBAR, payload: dummyErrorMessage
        }
        expect(dispatchErrorMessage(dummyErrorMessage)).toEqual(expectedAction)
    });
})