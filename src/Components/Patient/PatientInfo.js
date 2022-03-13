import { React, useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { patientAction } from '../../Actions/PatientAction'
import Loader from '../Loading/Loader';
import Grid from "@mui/material/Grid";


const PatientInfo = ( {match} ) => {
    const id = match.params.id
    const { patient, loading } = useSelector((state) => state.patient);
    const dispatch = useDispatch()
    const [data, setData] = useState()

    useEffect(() => {
        if (patient && patient.length === 0) {
            dispatch(patientAction())
        }
        const filterData = () => {
            if (patient && patient.length !== 0) {
            }
            setData(patient && patient.data && patient.data.filter((e) => e.id === id));
        }
        filterData()
        
    }, [dispatch, patient, id])

    console.log(data)
    
    if (loading) {
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
                data && data.map((e, i) =>
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
                        <h1>problemDescription : {e.problemDescription}</h1>
                        <h1>Registration Date : {e.createAt}</h1>
                        <img 
                        src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
                        alt="Patient Img"
                        />
                        <br />
                    </div>
                )
            }

        </Fragment>
    )
}

export default PatientInfo