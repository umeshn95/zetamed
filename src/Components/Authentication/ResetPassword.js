import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const ResetPassword = ({ match }) => {

    let token = match.params.token
    const history = useHistory();
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const alert = useAlert();

    const resetPassword = async () => {
        let item = { password, token }
        if (password.length < 8 || confirmPassword.length < 8) {
            return alert.error("Password should be 8 digit!")
        }
        if (password !== confirmPassword) {
            return alert.error("Password did not Match!")
        }
        try{
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/password_reset/confirm/`, item)
            .then((response) => {
              if (response.status === 200){
                alert.success("Your password reseted.")
                history.push('/login')
              } else{
                alert.error("Your password not reseted!!!")
              }
            })
        } catch(error){
            alert.error("fill strong and proper password!!!")
        }
    }


    return (
        <Fragment>
            <div >
                <input type="password" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
                <button onClick={resetPassword}>Reset Password</button>
            </div>
        </Fragment>
    )
}

export default ResetPassword;

