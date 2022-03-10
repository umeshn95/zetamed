import axios from "axios"
import {
    REQUEST_PATIENT,
    SUCCESS_PATIENT,
    FAIL_PATIENT,
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