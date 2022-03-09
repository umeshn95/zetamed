import { configureStore } from '@reduxjs/toolkit'
import { RegistrationReducer, ProfileReducer } from './Reducers/AuthenticationReducers'

const Store = configureStore({
    reducer : {
        user : RegistrationReducer,
        profile : ProfileReducer,
    } 
})

export default Store