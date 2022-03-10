import { React, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { patientAction } from '../../Actions/PatientAction'
import { Link } from 'react-router-dom'
import Loader from '../Loading/Loader';

const PatientList = () => {
    const { patient, loading } = useSelector((state) => state.patient);
    const dispatch = useDispatch()

    useEffect(() => {
        if (patient && patient.length === 0) {
            dispatch(patientAction())
        }
    }, [dispatch, patient])

    if(loading){
        return(
            <Loader/>
        )
    }
    return (
        <Fragment>
            <div>PatientList</div>
            {
                patient &&  patient.data && patient.data.map((e, i) => 
                <div key={i}>
                <h1>D.O.B : {e.age}</h1>
                <h1>Patient Name : {e.name}</h1>
                <h1>Gender : {e.gender}</h1>
                <h1>Mobile No. : {e.mobileNo}</h1>
                <h1>email : {e.email}</h1>
                <h1>Problem : {e.problem}</h1>
                <h1>Registration Date : {e.createAt}</h1>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
                  alt="Patient Img"
                />
                <br />
                <Link to={`/patient/${e.id}`}><button>Full Info</button></Link>
            </div>
                )
            }
            
        </Fragment>

    )
}

export default PatientList