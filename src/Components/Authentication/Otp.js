import { React, Fragment, useState } from 'react'
import axios from 'axios'
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom'
  
const Otp = () => {
    const alert = useAlert();
    const [otpInput, setOtpInput] = useState(false)
    const [otpNo, setOtpNo] = useState()
    const [mobile, setMobile] = useState()
    const [disMobile, setDisMobile] = useState(false)
    const [disOtp, setDisOtp] = useState(false)

    const sendOtpRequest = () => {
        let mobileNo = Number(mobile)
        let item = { mobileNo }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/send-otp/`, item)
            .then((response) => {
                if (response.data.status === 202) {
                    setOtpInput(true)
                    setDisMobile(true)
                    localStorage.setItem('mobileNo', response.data.mobileNo)
                    alert.success(response.data.details)
                } else {
                    alert.error(response.data.details)
                }
            })
    }

    const otpSubmit = () => {
        let isOtp = Number(otpNo)
        let mobileNo = Number(localStorage.getItem('mobileNo'))
        let item = { isOtp, mobileNo }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/authentication/otp-verify/`, item)
            .then((response) => {
                if (response.data.status === 200) {
                    setDisOtp(true)
                    alert.success(response.data.details)
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
                <div>
                    <input
                        type="number"
                        placeholder="Mobile No"
                        required
                        name="number"
                        value={mobile}
                        disabled={disMobile}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <button onClick={() => sendOtpRequest()}>Send Otp</button>
                </div>

                {
                    otpInput ?
                        <div>
                            <input
                                type="number"
                                placeholder="Enter OTP"
                                required
                                name="number"
                                value={otpNo}
                                disabled={disOtp}
                                onChange={(e) => setOtpNo(e.target.value)}
                            />
                            <button onClick={() => otpSubmit()}>Submit Otp</button>
                        </div>
                        :
                        ""
                }
                <h5>if allready verify otp so <Link to='/registration'>click here</Link></h5>
                <h5>if allready registration <Link to='/login'>click here</Link></h5>
            </div>
        </Fragment>
    )
}
export default Otp

