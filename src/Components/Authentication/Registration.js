import { React, useState, Fragment } from 'react'
import { useAlert } from "react-alert";
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {
  SUCCESS_REGISTRATION,
} from '../../Constants/AuthenticationConstants'


const Registration = () => {
  const alert = useAlert();
  const dispatch = useDispatch()
  const history = useHistory();
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [mobile, setMobile] = useState(localStorage.getItem('mobileNo') ? localStorage.getItem('mobileNo') : "")
  const [iAm, setIAm] = useState("")
  const [speciality, setSpeciality] = useState("")
  const [clinicName, setClinicName] = useState("")


  const registrationFunc = async () => {
    let mobileNo = Number(mobile)
    let item = { firstName, email, password, mobileNo, iAm, speciality, clinicName }
    if (password.length < 8 || confirmPassword.length < 8) {
      return alert.error("Password should be 8 digit!")
    }
    if (password !== confirmPassword) {
      return alert.error("Password did not Match!")
    }
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/user-register/`, item)
      .then((response) => {
        if (response.data.status === 202) {
          dispatch({
            type: SUCCESS_REGISTRATION,
            payload: response.data.data,
          })
          localStorage.setItem("user-details", JSON.stringify(response.data.data));
          localStorage.removeItem("mobileNo")
          alert.success(response.data.details)
          history.push('/')
          return
        } else {
          alert.error(response.data.details)
          return
        }

      })
  }

  return (
    <Fragment>
      <div>
        <div>Signin</div>
        <input
          type="text"
          placeholder="Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <select onChange={(e) => setIAm(e.target.value)}>
          <option value="Select">Select</option>
          <option value="Doctore">Doctore</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
        />

        <input
          type="text"
          placeholder="Clinic Name"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Verify Mobile No."
          disabled={localStorage.getItem('mobileNo') ? true : false}
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br />
        <button onClick={() => registrationFunc()}>Submit</button>
      </div>
    </Fragment>
  )
}

export default Registration


