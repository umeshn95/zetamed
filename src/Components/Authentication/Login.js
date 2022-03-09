import { React, useState, Fragment } from 'react'
import { useAlert } from "react-alert";
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {
  SUCCESS_REGISTRATION,
} from '../../Constants/AuthenticationConstants'

const Login = () => {
  const alert = useAlert();
  const dispatch = useDispatch()
  const history = useHistory();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const LoginFunc = async () => {
    let item = { username, password }
    // if (password.length < 8) {
    //   return alert.error("Password should be 8 digit!")
    // }
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/user-login/`, item)
        .then((response) => {
          dispatch({
            type: SUCCESS_REGISTRATION,
            payload: response.data,
          })
          localStorage.setItem("user-details", JSON.stringify(response.data));
          alert.success("Login Successfully")
          history.push('/')
        })
    } catch (error) {
      alert.error(error.response.data.detail)
    }
  }

  return (
    <Fragment>
      <div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={() => LoginFunc()}>Login</button>
      </div>
    </Fragment>
  )
}

export default Login

