import { configureStore } from '@reduxjs/toolkit'
import { RegistrationReducer } from './Components/Reducers/AuthenticationReducers'

const Store = configureStore({
    reducer : {
        registration : RegistrationReducer
    } 
})

export default Store