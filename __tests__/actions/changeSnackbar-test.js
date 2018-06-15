// @flow
interface snackBarStateObjectInterface {
    errorMessage: { message: string },
    snackBarOpenState: { openState: boolean }
}
import { CHANGE_SNACKBAR } from "../../source/constants/action-types"
import { changeSnackbar } from "../../source/actions/changeSnackbar"

const dummySnackBarStateObject: snackBarStateObjectInterface = {
    errorMessage: { message: "dummyErrorMessage" },
    snackBarOpenState: { openState: true }
}

describe('changeSnackbar action', () => {
    it('should create an action to set the snackbar state', () => {
        const expectedAction = {
            type: CHANGE_SNACKBAR, payload: dummySnackBarStateObject
        }
        expect(changeSnackbar(dummySnackBarStateObject)).toEqual(expectedAction)
    })
})