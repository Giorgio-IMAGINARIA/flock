// @flow
type snackBarStateObjectInterface =  {
    errorMessage: { message: string },
    snackBarOpenState: { openState: boolean }
}
import { CHANGE_SNACKBAR } from "../constants/action-types"
export const changeSnackbar = (snackBarStateObject: snackBarStateObjectInterface) => ({ type: CHANGE_SNACKBAR, payload: snackBarStateObject })


// https://hackernoon.com/redux-unit-testing-with-jest-f3a18f387f75
