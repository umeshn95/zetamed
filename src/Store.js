import { configureStore } from '@reduxjs/toolkit'
import { RegistrationReducer, ProfileReducer } from './Reducers/AuthenticationReducers'
import { PatientReducer, PatientGroupReducer } from './Reducers/PatientReducers'
import { countryReducer } from './Reducers/MicroApiReducers'


const Store = configureStore({
    reducer : {
        // user Authentication
        user : RegistrationReducer,
        profile : ProfileReducer,

        // Patient
        patient : PatientReducer,
        patientGroup : PatientGroupReducer,

        // Micro Api
        allCountry : countryReducer
    } 
})

export default Store