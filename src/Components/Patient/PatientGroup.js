import { React, useEffect, Fragment } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'

const PatientGroup = () => {
    // const alert = useAlert();
    // const userInfo = JSON.parse(localStorage.getItem("user-details"));
    const dispatch = useDispatch()
    const { patientGroup } = useSelector((state) => state.patientGroup)

    // const [problemDescription, setProblemDescription] = useState("");
    // const [patientGroupp, setPatientGroupp] = useState("");


    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
    }, [dispatch, patientGroup,])

    return (
        <Fragment>
            <div>
                <h1>PatientGroup</h1>
                <hr />
                {
                    patientGroup && patientGroup.map((e) =>
                        <div>
                            <h1>Disease : {e.disease}</h1>
                            <h1>DiseaseDiscription : {e.diseaseDiscription}</h1>
                            <h1>Create At : {e.createAt}</h1>
                            <button>Update Group</button>
                            <button>Delete Group</button>
                            <button>This Group's All Patient</button>
                            <hr />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}

export default PatientGroup