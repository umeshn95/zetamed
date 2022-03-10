import { createReducer, } from '@reduxjs/toolkit'
import {
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,
} from '../Constants/PatientConstants'


const initialStatePatient = {
    patient : []
}

export const PatientReducer = createReducer(initialStatePatient, {

    [REQUEST_PATIENT]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT]: (state, action) => {
        state.patient = action.payload
        state.loading = false
    },

    [FAIL_PATIENT]: (state, action) => {
        state.patient = action.payload
        state.loading = false
    },

}) 