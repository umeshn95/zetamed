import { createReducer,  } from '@reduxjs/toolkit'
import {
    SUCCESS_REGISTRATION,
} from '../Constants/AuthenticationConstants'

const initialState = {
}

export const RegistrationReducer = createReducer(initialState, {

    [SUCCESS_REGISTRATION] : (state, action) => {
        state.register = action.payload
    },

})