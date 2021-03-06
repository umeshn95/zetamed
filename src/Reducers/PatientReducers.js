import { createReducer, } from '@reduxjs/toolkit'
import {
    // Patien list
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,

    // Patien group
    REQUEST_PATIENT_GROUP,
    SUCCESS_PATIENT_GROUP,
    FAIL_PATIENT_GROUP,

    // Patien Single
    REQUEST_PATIENT_SINGLE,
    SUCCESS_PATIENT_SINGLE,
    FAIL_PATIENT_SINGLE,
} from '../Constants/PatientConstants'


const initialStatePatient = {
    patient: []
}

const initialStatePatientGroup = {
    patientGroup: []
}

const initialStatePatientSingle = {
    patientSingle: []
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
        state.error = action.payload.data.details
        state.loading = false
    },

})

export const PatientGroupReducer = createReducer(initialStatePatientGroup, {

    [REQUEST_PATIENT_GROUP]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT_GROUP]: (state, action) => {
        state.patientGroup = action.payload.data
        state.loading = false
    },

    [FAIL_PATIENT_GROUP]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

})

export const PatientSingleReducer = createReducer(initialStatePatientSingle, {

    [REQUEST_PATIENT_SINGLE]: (state) => {
        state.loading = true
    },

    [SUCCESS_PATIENT_SINGLE]: (state, action) => {
        state.patientSingle = action.payload
        state.loading = false
    },

    [FAIL_PATIENT_SINGLE]: (state, action) => {
        state.error = action.payload.data.details
        state.loading = false
    },

}) 