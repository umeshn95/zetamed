import { configureStore } from '@reduxjs/toolkit'
import { RegistrationReducer, ProfileReducer } from './Reducers/AuthenticationReducers'
import { PatientReducer, PatientGroupReducer } from './Reducers/PatientReducers'

const Store = configureStore({
    reducer : {
        // user Authentication
        user : RegistrationReducer,
        profile : ProfileReducer,

        // Patient
        patient : PatientReducer,
        patientGroup : PatientGroupReducer,
    } 
})

export default Store