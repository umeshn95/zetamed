//automate main div-

import Grid from "@mui/material/Grid";
import React from "react";
import "./styles.css";
const GetInTouch = () => {
  return (
    <div className="Signup_main">
      <div className="Signup_sub">
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={8} xl={8}>
                      <div className="Signup_8">
                          <Grid container>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>Sign up for Healcon Practice free trial</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>Name*</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>Phone*</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>Email*</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>Create Password*</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>I'm*</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>Select Speciality*
</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div>Clinic Name*
</div> <div><input type='text'></input></div>
</Grid>
                              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>Proceed</Grid>
                              
                          </Grid>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="Signup_8">Practice on the cloud
  Digitise / Print / Email / SMS - Prescriptions, Clinical Notes, Treatment Plans, Medical Bills and lot more.
  Automated patient appointment SMS reminders. Reduce no shows / Improve follow-up visits .
  Enable seamless online booking for patients with free clinic webpage and an integrated advanced calendar.
  Delight your patients with automated birthday/festival wishes .
  Improve quality of care, patient loyalty and clinic recall .
  Highest safety and security standards - HIPPA Compliant Data Center.
  Transparent pricing. No strings attached .
(For any queries contact us at help@healcon.com. We provide free on-boarding support with demo and existing data import)

Healcon LLC, Middletown, Delaware, USA</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default GetInTouch;
