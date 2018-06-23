// @flow
interface DroneQueryObject {
    droneID: any
}
import { FETCH_DRONES, CHANGE_SNACKBAR } from "../../source/constants/action-types";
import { dispatchDrones, dispatchErrorMessage } from "../../source/actions/fetchDrones"


const dummySnackBarStateObject: DroneQueryObject = {
    droneID: 'any'
}

describe('fetchDrones action', () => {
    it('should create an action to set the snackbar state', () => {
        const expectedAction = {
            type: CHANGE_SNACKBAR, payload: dummySnackBarStateObject
        }
        expect(dispatchDrones(dummySnackBarStateObject)).toEqual(expectedAction)
    })
})