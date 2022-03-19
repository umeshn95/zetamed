import { React, useEffect, Fragment, useState } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loading/Loader';
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { useAlert } from "react-alert";

const PatientGroup = () => {
    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch()

    const { patientGroup, loading } = useSelector((state) => state.patientGroup)
    const [cusLoading, setCusLoading] = useState(false)
    const [data, setData] = useState("")
    const [value, setValue] = useState("")

    const deletePatientGroup = (id) => {
        setCusLoading(true)
        const userInfo = JSON.parse(localStorage.getItem('user-details'))
        const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/${id}/`, config)
            .then((response) => {
                if (response.data.status === 200) {
                    dispatch(patientGroupAction())
                    alert.success(response.data.details)
                } else {
                    alert.error(response.data.details)
                }
            })
        setCusLoading(false)
    }

    const groupWisedata = (id) => {
        sessionStorage.setItem("petientSignal", "4")
        sessionStorage.setItem("query", id)
        history.push("/patient")
    }

    const searchFilter = () => {
        setData(data && data.filter((e) => e.disease === value))
    }

    const allGroup = () => {
        setData(patientGroup && patientGroup) 
        setValue("")
    }

    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientGroup && patientGroup.length !== 0) {
            setData(patientGroup && patientGroup)
        }
    }, [dispatch, patientGroup,])

    if (cusLoading || loading) {
        return (
            <Loader />
        )
    }

    return (
        <Fragment>
            <div>
                <h1>PatientGroup</h1>
                <div>
                    <input type="text" value={value} 
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <br />
                    <button onClick={() => searchFilter()}>Search Group</button>
                    <br />
                    <button onClick={() => allGroup()}>All Patient Group</button>
                </div>
                <hr />
                {
                    data && data.map((e, i) =>
                        <div key={i}>
                            <h1>Disease : {e.disease}</h1>
                            <h1>DiseaseDiscription : {e.diseaseDiscription}</h1>
                            <h1>Create At : {e.createAt}</h1>
                            <Link to={`/patient-group-update/${e.id}`}><button>Update Group</button> </Link>
                            <button onClick={() => deletePatientGroup(e.id)}>Delete Group</button>
                            <button onClick={() => groupWisedata(e.id)}>This Group's All Patient</button>
                            <hr />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default PatientGroup