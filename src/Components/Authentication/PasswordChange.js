import React, { Fragment, useState } from "react";
import { useAlert } from "react-alert";
import axios from 'axios'

const PasswordChange = () => {
    const alert = useAlert();
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = async () => {
        if (password.length < 8 || confirmPassword.length < 8) {
            return alert.error("Password should be 8 digit!")
        }
        if (password !== confirmPassword) {
            return alert.error("Password did not Match!")
        }
        try {
            let old_password = oldPassword
            let new_password = password
            let item = { old_password, new_password }
            const userInfo = JSON.parse(localStorage.getItem('user-details'))
            const config = { headers: { 'Authorization': `Bearer ${userInfo && userInfo.token}` } }
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/password-change/`, item, config)
                .then((response) => {
                    if (response.status === 200) {
                        alert.success("Your password Changed.")
                        setOldPassword("")
                        setPassword("")
                        setConfirmPassword("")
                    } else {
                        alert.error("Your password not Changed!!!")
                    }
                })
        } catch (error) {
            if (error.response.status === 400){
                alert.error("Old Password is Wrong")
                return
            }
            alert.error("fill strong and proper password!!!")
            return
        }
    };

    return (
        <Fragment>
            <div >
                <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="New Password"
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
                <button onClick={() => updatePasswordSubmit()}>Change Password</button>

            </div>
        </Fragment>
    );
};

export default PasswordChange;
