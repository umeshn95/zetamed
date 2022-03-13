import axios from "axios"
import {
    // Patien list
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,

    // Patien group
    REQUEST_PATIENT_GROUP,
    SUCCESS_PATIENT_GROUP,
    FAIL_PATIENT_GROUP,
} from '../Constants/PatientConstants'


const userInfo = JSON.parse(localStorage.getItem('user-details'))


export const patientAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/`, config)
        dispatch({ type: SUCCESS_PATIENT, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT, payload: error.response.details })
    }
}

export const patientGroupAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_GROUP })
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/`, config)
        dispatch({ type: SUCCESS_PATIENT_GROUP, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_GROUP, payload: error.response.details })
    }
}