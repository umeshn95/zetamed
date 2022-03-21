import { React, useState, useEffect, Fragment } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { useAlert } from "react-alert";
import Loader from '../Loading/Loader';

const PatientGroupInfo = ({ match }) => {
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch()
    const { patientGroup, loading } = useSelector((state) => state.patientGroup)
    const [cusLoading, setCusLoading] = useState(false)
    const [data, setData] = useState("");

    const groupWisedata = (id) => {
        sessionStorage.setItem("petientSignal", "4")
        sessionStorage.setItem("query", id)
        history.push("/patient")
    }

    const deletePatientGroup = () => {
        setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/${match.params.id}/`, config)
            .then((response) => {
                if (response.data.status === 200) {
                    alert.success(response.data.details)
                    dispatch(patientGroupAction())
                    history.push('/patient-group')
                } else {
                    alert.error(response.data.details)
                }
            })
        setCusLoading(false)
    }

    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientGroup && patientGroup.length !== 0) {
            setData(patientGroup && patientGroup.filter((e) => e.id === match.params.id))
        }
    }, [dispatch, patientGroup, match.params.id])


    if (cusLoading || loading) {
        return (
            <Loader />
        )
    }

    return (
        <Fragment>
            <div>
                <h1>PatientGroup</h1>
                <hr />
                {
                    data && data.map((e) =>
                        <div>
                            <h1>Disease : {e.disease}</h1>
                            <h1>DiseaseDiscription : {e.diseaseDiscription}</h1>
                            <h1>Create At : {e.createAt}</h1>
                            <Link to={`/patient-group-update/${e.id}`}><button>Update Group</button> </Link>
                            <button onClick={() => deletePatientGroup()}>Delete Group</button>
                            <button onClick={() => groupWisedata(e.id)}>This Group's All Patient</button>
                            <hr />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default PatientGroupInfo