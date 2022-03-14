import { React, useState, useEffect, Fragment } from 'react'
import { patientGroupAction } from "../../Actions/PatientAction";
import { useDispatch, useSelector } from 'react-redux'


const UpdatePatientGroup = ({match}) => {
    const dispatch = useDispatch()
    const { patientGroup } = useSelector((state) => state.patientGroup)

    const [patientGroupp, setPatientGroupp] = useState("");
    const [problemDescription, setProblemDescription] = useState("");

    useEffect(() => {
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if(patientGroup && patientGroup.length !== 0){
            setPatientGroupp(patientGroup && patientGroup.filter((e) => e.id === match.params.id)[0].disease)
            setProblemDescription(patientGroup && patientGroup.filter((e) => e.id === match.params.id)[0].diseaseDiscription)
        }
        
    }, [dispatch, patientGroup, match.params.id])

      return (
        <Fragment>
            <div>Update Patient Group</div>
            <div>
                <input
                    type="text"
                    required
                    placeholder="Group Name"
                    value={patientGroupp}
                    onChange={(e) => setPatientGroupp(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    required
                    placeholder="Group Description"
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                />
                <br />
                <button>Update Group</button>
            </div>
        </Fragment>

    )
}

export default UpdatePatientGroup