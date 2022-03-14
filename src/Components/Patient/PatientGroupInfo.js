import { React, useState, useEffect, Fragment } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom' 


const PatientGroupInfo = ({match}) => {
    // const alert = useAlert();
    // const userInfo = JSON.parse(localStorage.getItem("user-details"));
    const dispatch = useDispatch()
    const { patientGroup } = useSelector((state) => state.patientGroup)

    // const [problemDescription, setProblemDescription] = useState("");
    // const [patientGroupp, setPatientGroupp] = useState("");
    const [data, setData] = useState("");


    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if(patientGroup && patientGroup.length !== 0){
            setData(patientGroup && patientGroup.filter((e) => e.id === match.params.id))
        }
    }, [dispatch, patientGroup, match.params.id])

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

export default PatientGroupInfo