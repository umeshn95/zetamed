import { React, useEffect, Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { patientAction } from '../../Actions/PatientAction'
import Loader from '../Loading/Loader';

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