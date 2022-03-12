import { Fragment, React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { patientGroupAction } from "../../Actions/PatientAction";

const AddPatient = () => {
    const userInfo = JSON.parse(localStorage.getItem("user-details"));
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState("");
    const [imgSignal, setImageSignal] = useState();
    const [letestImg, setLetestImg] = useState("");

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [whichProof, setWhichProof] = useState("");
    const [proofId, setProofId] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [problem, setProblem] = useState("");
    const [problemDescription, setProblemDescription] = useState("");
    const [patientGroup, setPatientGroup] = useState("");


    // const [cusLoading, setCusLoading] = useState(false);

    const addPatient = async () => {
        let patientImage = selectedImage;
        const myForm = new FormData();
        myForm.set("patientImage", patientImage);
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userInfo && userInfo.access}`,
            },
        };
        const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/`, myForm, config);
        console.log(data)
    }

    const updateProfileDataChange = (e) => {
        try {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImageSignal(true);
                    setLetestImg(reader.result);
                    setSelectedImage(e.target.files[0]);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } catch (error) {
            setImageSignal(false);
        }
    };

    useEffect(() => {
        dispatch(patientGroupAction())
    }, [dispatch])

    return (
        <Fragment>
            <div>AddPatient</div>
            <div>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <select onChange={(e) => setGender(e.target.value)}>
                    <option value="Select">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <select onChange={(e) => setWhichProof(e.target.value)}>
                    <option value="Select">Select</option>
                    <option value="Adhar">Adhar</option>
                    <option value="Voter Id">Voter Id</option>
                    <option value="Driving LCS">Driving LCS</option>
                </select>

                <input
                    type="text"
                    placeholder="Mobile No."
                    value={age}
                    onChange={(e) => setMobileNo(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={age}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div>Country</div>
                <select onChange={(e) => setCountry(e.target.value)}>
                    <option value="Select">Select</option>
                    <option value="India">India</option>
                </select>

                <div>State</div>
                <select onChange={(e) => setState(e.target.value)}>
                    <option value="Select">Maharashtra</option>
                    <option value="India">Madhya Pradesh</option>
                </select>

                <div>City</div>
                <select onChange={(e) => setState(e.target.value)}>
                    <option value="Select">INDORE</option>
                    <option value="India">Mumbai</option>
                </select>

                <input
                    type="text"
                    placeholder="Zip Code"
                    value={age}
                    onChange={(e) => setZipcode(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Problem"
                    value={age}
                    onChange={(e) => setProblem(e.target.value)}
                />

                <textarea 
                    type="textarea"
                    placeholder="Problem Discription"
                    value={age}
                    rows={4} 
                    cols={50}
                    onChange={(e) => setProblemDescription(e.target.value)}
                />

                <div>Patient Group</div>
                <select onChange={(e) => setPatientGroup(e.target.value)}>
                    <option value="Select">Select</option>
                    <option value="Eye Problem">Eye Problem</option>
                </select>

                <input
                    style={{ "border": "5px solid #ccc", "display": "inline-block", "padding": "6px 12px", "cursor": "pointer" }}
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    placeholder='upload image'
                />
            </div>
            <br />
            <button onClick={() => addPatient()}>Submit</button>
        </Fragment>
    )
}

export default AddPatient