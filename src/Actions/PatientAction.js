import axios from "axios"
import {
    // Patient list
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,

    // Patient group
    REQUEST_PATIENT_GROUP,
    SUCCESS_PATIENT_GROUP,
    FAIL_PATIENT_GROUP,

    // Patinet Single
    REQUEST_PATIENT_SINGLE,
    SUCCESS_PATIENT_SINGLE,
    FAIL_PATIENT_SINGLE,
} from '../Constants/PatientConstants'


const userInfo = JSON.parse(localStorage.getItem('user-details'))
const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }

export const patientAction = (page, filter) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT })
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/?query=${filter}&page=${page}`, config)
        dispatch({ type: SUCCESS_PATIENT, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT, payload: error.response.details })
    }
}

export const patientGroupAction = () => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_GROUP })
        let { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/`, config)
        dispatch({ type: SUCCESS_PATIENT_GROUP, payload: data })
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_GROUP, payload: error.response.details })
    }
}


export const PatienSingleAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: REQUEST_PATIENT_SINGLE })
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${id}/`, config)
            .then((response) => 
            dispatch({ type: SUCCESS_PATIENT_SINGLE, payload: response.data })
        )
    } catch (error) {
        dispatch({ type: FAIL_PATIENT_SINGLE, payload: error.response.details })
    }
}
