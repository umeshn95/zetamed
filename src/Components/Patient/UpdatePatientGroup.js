import { React, useState, useEffect, Fragment } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from "react-alert";
import axios from 'axios';
import Loader from '../Loading/Loader';


const UpdatePatientGroup = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch()
    const { loading, patientGroup } = useSelector((state) => state.patientGroup)

    const [cusLoading, setCusLoading] = useState("");

    const [disease, setDisease] = useState("");
    const [diseaseDiscription, setDiseaseDiscription] = useState("");

    const updatePatientGroupFunc = async () => {
        setCusLoading(true)
        const myForm = new FormData();
        myForm.set("disease", disease);
        myForm.set("diseaseDiscription", diseaseDiscription);
        const userInfo = JSON.parse(localStorage.getItem("user-details"));
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo && userInfo.access}`,
            },
        };
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient-group/${match.params.id}/`, myForm, config);
        if (data.status === 202) {
            alert.success(data.details)
            dispatch(patientGroupAction())
        } else {
            alert.error(data.details)
        }
        setCusLoading(false)
    }

    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientGroup && patientGroup.length !== 0) {
            setDisease(patientGroup && patientGroup.filter((e) => e.id === match.params.id)[0].disease)
            setDiseaseDiscription(patientGroup && patientGroup.filter((e) => e.id === match.params.id)[0].diseaseDiscription)
        }

    }, [dispatch, patientGroup, match.params.id])

    if (loading || cusLoading) {
        return (
            <Loader />
        )
    }

    return (
        <Fragment>
            <div>Update Patient Group</div>
            <div>
                <input
                    type="text"
                    required
                    placeholder="Disease Name"
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    required
                    placeholder="Disease Description"
                    value={diseaseDiscription}
                    onChange={(e) => setDiseaseDiscription(e.target.value)}
                />
                <br />
                <button onClick={() => updatePatientGroupFunc()}>Update Group</button>
            </div>
        </Fragment>

    )
}

export default UpdatePatientGroup