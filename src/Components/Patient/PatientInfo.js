import { React, useEffect, Fragment, useState } from 'react'
import Loader from '../Loading/Loader';
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux'
import { PatienSingleAction } from '../../Actions/PatientAction';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAlert } from "react-alert";


const PatientInfo = ( {match} ) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const history = useHistory()
    const { loading, patientSingle } = useSelector((state) => state.patientSingle)
    const [cusLoading, setCusLoading] = useState(false)

        useEffect(() => {
            if(sessionStorage.getItem("petientSingleSignal") === "2" || sessionStorage.getItem("petientSingleSignal") === "3"){
                dispatch(PatienSingleAction(match.params.id))
                sessionStorage.removeItem("petientSingleSignal")
            } else{
                if(patientSingle && patientSingle.length === 0){
                    dispatch(PatienSingleAction(match.params.id))
                } else{
                    if(patientSingle && patientSingle.data[0].id !== match.params.id){
                        dispatch(PatienSingleAction(match.params.id))
                    }
                }
            }
            
    }, [dispatch, patientSingle, match.params.id])

    const deletePatient = (id) => {
        setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${id}/`, config)
        .then((response) => {
            if (response.data.status === 200){
                sessionStorage.setItem("petientSignal", "3")
                sessionStorage.setItem("petientSingleSignal", "3")
                alert.success(response.data.details)
                    history.push('/patient')
                }else{
                    alert.error(response.data.details)
                }
        })
        setCusLoading(false)
            
    }


    if (loading || cusLoading) {
        return (
            <Loader />
        )
    }
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={6} sm={6} md={6} lg={2.4} xl={2.4} >
                    Overview
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={2.4} xl={2.4} >
                    Appointment
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={2.4} xl={2.4} >
                    Treatment
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={2.4} xl={2.4} >
                    Prescription
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={2.4} xl={2.4} >
                    Clinical Notes
                </Grid>
               
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    Overview
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    Appointment
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    Treatment
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    Prescription
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                    Clinical Notes
                </Grid>
               
            </Grid>
            <div>PatientList</div>

            {
                loading === false && patientSingle && patientSingle.data.map((e, i) =>
                    <div key={i}>
                        <h1>D.O.B : {e.age}</h1>
                        <h1>Patient Name : {e.name}</h1>
                        <h1>Gender : {e.gender}</h1>
                        <h1>Mobile No. : {e.mobileNo}</h1>
                        <h1>email : {e.email}</h1>
                        <h1>Problem : {e.problem}</h1>
                        <h1>whichProof : {e.whichProof}</h1>
                        <h1>proofId : {e.proofId}</h1>
                        <h1>city : {e.city}</h1>
                        <h1>state : {e.state}</h1>
                        <h1>country : {e.country}</h1>
                        <h1>zipcode : {e.zipcode}</h1>
                        <h1>Patient Group Name : {patientSingle && patientSingle.patientGroup}</h1>
                        <h1>problemDescription : {e.problemDescription}</h1>
                        <h1>Registration Date : {e.createAt}</h1>
                        <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
                        alt="Patient Img"
                        />
                        <br />
                        <div>
                            <button><Link  to={`/update-patient/${patientSingle && patientSingle.data[0].id}`}>Update patient</Link></button>
                        <br />
                        <button onClick={() => deletePatient(patientSingle && patientSingle.data[0].id)}>Delete Patient</button>
                        <br />
                        <button><Link  to={`/patient-group/${patientSingle && patientSingle.patientGroupId}`}>patient Group</Link></button>
                        </div>
                    </div>
                )
            }

        </Fragment>
    )
}

export default PatientInfo

// useEffect(() => {
//     if (patient && patient.length === 0) {
//         dispatch(patientAction())
//     }
//     const filterData = () => {
//         if (patient && patient.length !== 0) {
//         }
//         setData(patient && patient.data && patient.data.filter((e) => e.id === id));
//     }
//     filterData()
    
// }, [dispatch, patient, id])