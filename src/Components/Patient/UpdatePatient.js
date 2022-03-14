import { Fragment, React, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { patientAction, patientGroupAction } from "../../Actions/PatientAction";
import { countryAction } from "../../Actions/MicroApiAction";
import Calendar from 'react-calendar';
import { useAlert } from "react-alert";
import { PatienSingleAction } from '../../Actions/PatientAction';
import Loader from "../Loading/Loader";

const UpdatePatient = ({ match }) => {
    const alert = useAlert();
    const userInfo = JSON.parse(localStorage.getItem("user-details"));
    const { loading, patientSingle } = useSelector((state) => state.patientSingle)
    const { patient } = useSelector((state) => state.patient);
    const dispatch = useDispatch()
    const { allCountry } = useSelector((state) => state.allCountry)
    const { patientGroup } = useSelector((state) => state.patientGroup)

    const [selectedImage, setSelectedImage] = useState("");
    const [letestImg, setLetestImg] = useState("");
    const [imgSignal, setImageSignal] = useState();

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
    const [patientGroupp, setPatientGroupp] = useState("");
    const [calenderTrueFalse, setCalenderTrueFalse] = useState(false);

    const [cusLoading, setCusLoading] = useState(false);

    const addPatientFunc = async (e) => {
        e.preventDefault();
        setCusLoading(true)
        if (age) {
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("age", age);
            myForm.set("gender", gender);
            myForm.set("whichProof", whichProof);
            myForm.set("proofId", proofId);
            myForm.set("mobileNo", mobileNo);
            myForm.set("email", email);
            myForm.set("city", city);
            myForm.set("state", state);
            myForm.set("country", country);
            myForm.set("zipcode", zipcode);
            myForm.set("problem", problem);
            myForm.set("problemDescription", problemDescription);
            let patientGroup = patientGroupp
            myForm.set("patientGroup", patientGroup)
            let patientImage = selectedImage;
            myForm.set("patientImage", patientImage);


            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo && userInfo.access}`,
                },
            };
            const { data } = await axios.put(
                `${process.env.REACT_APP_BACKEND_URL}/api/patient/get-patient/${match.params.id}/`, myForm, config);
            if (data.status === 201) {
                alert.success(data.details)
                sessionStorage.setItem("petientSignal", "2")
                sessionStorage.setItem("petientSingleSignal", "2")
            } else {
                alert.error(data.details)
            }
        } else {
            alert.error("Please Select D.O.B")
        }
        setCusLoading(false)
    }

    const onDateChange = (newDate) => {
        let dateArray = new Date(newDate).toLocaleDateString().split("/")
        setAge(String(`${Number(dateArray[2])}-${Number(dateArray[0])}-${Number(dateArray[1])}`))
        setCalenderTrueFalse(false)
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
        if (patient && patient.length === 0) {
            dispatch(patientAction(sessionStorage.getItem("page"), sessionStorage.getItem("query")));
          }
        if (allCountry && allCountry.length === 0) {
            dispatch(countryAction())
        }
        if (patientGroup && patientGroup.length === 0) {
            dispatch(patientGroupAction())
        }
        if (patientSingle && patientSingle.length === 0) {
            dispatch(PatienSingleAction(match.params.id))
        } else {
            if (patientSingle && patientSingle.data[0].id !== match.params.id) {
                dispatch(PatienSingleAction(match.params.id))
            }
        }
        setAge(loading === false ? patientSingle && patientSingle.data[0].age : "")
        setName(loading === false ? patientSingle && patientSingle.data[0].name : "")
        setGender(loading === false ? patientSingle && patientSingle.data[0].gender : "")
        setMobileNo(loading === false ? patientSingle && patientSingle.data[0].mobileNo : "")
        setEmail(loading === false ? patientSingle && patientSingle.data[0].email : "")
        setProblem(loading === false ? patientSingle && patientSingle.data[0].problem : "")
        setWhichProof(loading === false ? patientSingle && patientSingle.data[0].whichProof : "")
        setProofId(loading === false ? patientSingle && patientSingle.data[0].proofId : "")
        setCity(loading === false ? patientSingle && patientSingle.data[0].city : "")
        setState(loading === false ? patientSingle && patientSingle.data[0].state : "")
        setCountry(loading === false ? patientSingle && patientSingle.data[0].country : "")
        setZipcode(loading === false ? patientSingle && patientSingle.data[0].zipcode : "")
        setPatientGroupp(loading === false ? patientSingle && patientSingle.patientGroupId : "")
        setProblemDescription(loading === false ? patientSingle && patientSingle.data[0].problemDescription : "")

    }, [dispatch, loading, allCountry, patientGroup, patientSingle, match.params.id, patient])


    if (loading || cusLoading) {
        return (
            <Loader />
        )
    }

    let cityArray = []
    return (
        <Fragment>
            <div>Update Patient</div>
            <div>
                <form
                    encType="multipart/form-data"
                    onSubmit={addPatientFunc}
                >
                    <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <br />

                    <select
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="Select">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>


                    <br />
                    <select
                        required
                        value={whichProof}
                        onChange={(e) => setWhichProof(e.target.value)}
                    >
                        <option value="Select">Select</option>
                        <option value="Adhar">Adhar</option>
                        <option value="Voter Id">Voter Id</option>
                        <option value="Driving LCS">Driving LCS</option>
                    </select>
                    <br />
                    <input
                        required
                        type="text"
                        placeholder="Proof Id."
                        value={proofId}
                        onChange={(e) => setProofId(e.target.value)}
                    />
                    <br />
                    <input
                        required
                        type="text"
                        placeholder="Mobile No."
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                    />
                    <br />
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <select
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">Country</option>
                        {allCountry &&
                            allCountry.map((e, i) => (
                                <option key={i} value={e.country}>
                                    {e.country}
                                </option>
                            ))}
                    </select>

                    {country && (
                        <div>
                            <select
                                required
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                <option value="">State</option>
                                {allCountry &&
                                    allCountry.filter(e => e.country === country).map((p) =>
                                        p.state.map((s, i) =>
                                            <option key={i} value={s.state}>
                                                {s.state}
                                            </option>
                                        ))}
                            </select>
                        </div>
                    )}

                    {state && (
                        <div>
                            <select
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            >
                                <option value="">City</option>
                                {console.log(allCountry &&
                                    allCountry.filter(e => e.country === country && e.state.map(k => k.state === state ? k.city.map((s, i) =>
                                        <div key={i}>
                                            {cityArray.push(s.city)}
                                        </div>

                                    ) : ""))
                                )}
                                {
                                    cityArray && cityArray.map((e, i) =>
                                        <option key={i} value={e}>
                                            {e}
                                        </option>
                                    )
                                }
                            </select>
                        </div>
                    )}

                    <br />
                    <input
                        required
                        type="text"
                        placeholder="Zip Code"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                    <br />
                    <input
                        required
                        type="text"
                        placeholder="Problem"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                    />
                    <br />
                    <textarea
                        required
                        type="textarea"
                        placeholder="Problem Discription"
                        value={problemDescription}
                        rows={4}
                        cols={50}
                        onChange={(e) => setProblemDescription(e.target.value)}
                    />
                    <br />

                    <select
                        required
                        value={patientGroupp}
                        onChange={(e) => setPatientGroupp(e.target.value)}
                    >
                        <option value="">Patient Group</option>
                        {patientGroup &&
                            patientGroup.map((e, i) => (
                                <option key={i} value={e.id}>
                                    {e.disease}
                                </option>
                            ))}
                    </select>

                    <br />
                    <img
                        src={
                            imgSignal
                                ? letestImg
                                : `${process.env.REACT_APP_BACKEND_URL}${loading === false ? patientSingle && patientSingle.data[0].patientImage : ""
                                }`
                        }
                        alt="Profile images"
                    />
                    <input
                        style={{ "border": "5px solid #ccc", "display": "inline-block", "padding": "6px 12px", "cursor": "pointer" }}
                        type="file"
                        name="Patient Images"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                        placeholder='upload image'
                    />
                    <input
                        type="submit"
                        value="Update Patient"
                    />
                </form>
                <button onClick={() => setCalenderTrueFalse(calenderTrueFalse ? false : true)}>D.O.B</button>
                <div>
                    {
                        calenderTrueFalse ? (
                            <Calendar
                                onChange={onDateChange}
                                // value={age}
                                showNeighboringMonth={false}
                                locale={"en-US"}
                            />
                        ) :
                            ""
                    }
                    <h1>D.O.B : {age}</h1>
                </div>
            </div>
            <br />
        </Fragment>
    )
}

export default UpdatePatient