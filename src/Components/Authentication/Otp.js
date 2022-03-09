import { React, Fragment, useState } from "react";
import axios from "axios";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import "./styles.css";
const Otp = () => {
  const alert = useAlert();
  const history = useHistory();
  const [otpInput, setOtpInput] = useState(false);
  const [otpNo, setOtpNo] = useState();
  const [mobile, setMobile] = useState();
  const [disMobile, setDisMobile] = useState(false);
  const [disOtp, setDisOtp] = useState(false);

  const sendOtpRequest = () => {
    let mobileNo = Number(mobile);
    let item = { mobileNo };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/authentication/send-otp/`,
        item
      )
      .then((response) => {
        if (response.data.status === 202) {
          setOtpInput(true);
          setDisMobile(true);
          localStorage.setItem("mobileNo", response.data.mobileNo);
          alert.success(response.data.details);
          history.push('/registration')
        } else {
          // alert.error(response.data.details);
          if (response.data.status === 208) { 
            history.push('/registration')
            alert.error(response.data.details);
            return
          }
          alert.error(response.data.details);
          return
        }
      });
  };

  const otpSubmit = () => {
    let isOtp = Number(otpNo);
    let mobileNo = Number(localStorage.getItem("mobileNo"));
    let item = { isOtp, mobileNo };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/authentication/otp-verify/`,
        item
      )
      .then((response) => {
        if (response.data.status === 200) {
          setDisOtp(true);
          alert.success(response.data.details);
          return;
        } else {
          alert.error(response.data.details);
          return;
        }
      });
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div className="zetamed_main_otp_heading">ZetaMed</div>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{ backgroundColor: "#EFF4FB" }}
      >
        <div className="zetamed_main_otp_reg">
          <div className="zetamed_main_otp_input">
            {/* full name */}

            <Grid container style={{ padding: "50px"}} spacing={1.5}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Full Name</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="text"
                  placeholder="Full Name"
                  required
                  name="number"
                  value={mobile}
                  disabled={disMobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>

              {/* email */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Email</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="Email"
                  placeholder="Email"
                  required
                  name="number"
                  value={mobile}
                  disabled={disMobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>

              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">Mobile Number</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {" "}
                <input
                  className="zetamed_main_otp_actualinput"
                  type="number"
                  placeholder="Mobile No"
                  required
                  name="number"
                  value={mobile}
                  disabled={disMobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Grid>
              {/* Enter otp */}
              {otpInput ? (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="zetamed_main_otp_inputname">Enter OTP</div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {" "}
                    <input
                      className="zetamed_main_otp_actualinput"
                      type="number"
                      placeholder="Enter OTP"
                      required
                      name="number"
                      value={otpNo}
                      disabled={disOtp}
                      onChange={(e) => setOtpNo(e.target.value)}
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}

              {/* mobile number */}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="zetamed_main_otp_inputname">&nbsp;</div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                
                         {otpInput?   <button className='zetamed_otp_verify_button_css' onClick={() => otpSubmit()}>Confirm OTP</button>:<button className='zetamed_otp_verify_button_css' onClick={() => sendOtpRequest()}>Continue</button>}     
                              {/* <div className=''>
          if allready verify otp so <Link to="/registration">click here</Link>
        </div> */}
        <div className='zetamed_otp_verfy_loginhere'>
          If Already Registered <Link to="/login">click here</Link> to Login
        </div>
                          </Grid>
     
                          
            </Grid>
          </div>
        </div>
        <Grid>
                  
              </Grid>
              
      </Grid>
{/* 
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
          <button className='zetamed_otp_verify_button_css' onClick={() => sendOtpRequest()}>Send Otp</button>
        </div>

        {otpInput ? (
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
        ) : (
          ""
        )}
        <h5>
          if allready verify otp so <Link to="/registration">click here</Link>
        </h5>
        <h5>
          if allready registration <Link to="/login">click here</Link>
        </h5>
      </div> */}
    </>
  );
};
export default Otp;
