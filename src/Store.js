import { configureStore } from '@reduxjs/toolkit'
import { RegistrationReducer, ProfileReducer } from './Reducers/AuthenticationReducers'
import { PatientReducer } from './Reducers/PatientReducers'

const Store = configureStore({
    reducer : {
        user : RegistrationReducer,
        profile : ProfileReducer,
        patient : PatientReducer,
    } 
})

export default Store