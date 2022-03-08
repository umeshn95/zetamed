import React, { Fragment, useState } from 'react';
import { useAlert } from 'react-alert'
import axios from 'axios'

const ResetPasswordEmail = () => {
    const alert = useAlert();
    const [email, setEmail] = useState("")

    const sendPasswordReset = async () => {
        let item = { email }
        try{
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/password_reset/`, item)
            .then((response) => {
                if(response.status === 200){
                    setEmail("")
                    alert.success("Please Check your Email")
                }
            })
        } catch(error){
            alert.error(error.response.data.email[0])
        }
        
    }

    return (
        <Fragment>
        <h1>Password Resest</h1>
            <div>
                <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <button onClick={sendPasswordReset}>Reset Password</button>
            </div>

        </Fragment>

    )
};

export default ResetPasswordEmail;
