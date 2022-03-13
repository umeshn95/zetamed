import { React, useEffect, Fragment,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientAction } from "../../Actions/PatientAction";
import { Link } from "react-router-dom";
import Loader from "../Loading/Loader";
import Grid from "@mui/material/Grid";
import "./styles.css";

const PatientList = () => {
  const { patient, loading } = useSelector((state) => state.patient);
  const dispatch = useDispatch();

  useEffect(() => {
    if (patient && patient.length === 0) {
      dispatch(patientAction());
    }
  }, [dispatch, patient]);

  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Grid container style={{ border: "1px solid #b4cef8" }}>
        <div className="zetamed_patient_list_heading">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justify="center">
              <Grid item lg={6}>
                Patient Search
              </Grid>
              <Grid item lg={6} align="right">
                Add Patient
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div className="zetamed_main_otp_actualinputs">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container justify="center">
              <Grid item xs={8} sm={9} md={11} lg={11} xl={11}>
                <input
                  type="text"
                  className="zetamed_main_otp_actualinput"
                  placeholder="Type Patient Name or Email Or Mobile No.."
                ></input>
              </Grid>
              <Grid item xs={4} sm={3} md={1} lg={1} xl={1} align="right">
                <button className="zetamed_patientlist_searchpatient">
                  Search
                </button>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                align="right"
                justify="center"
                style={{
                  height: "30px",
                  background: "#e5e5e5",
                  marginTop: "15px",
                }}
              >
                       
          <div className="small_text">Number of Patients: <span className="bold">3</span></div>
        </Grid>
        <Grid
                    container
                    style={{ background: "#e5e5e5", padding: "2px" }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
                      <Grid container>
                        <Grid item xs={5} sm={5} md={4} lg={4} xl={4}>
                        <span className="bold">Patient</span>
                        </Grid>
                        <Grid item xs={5} sm={5} md={6} lg={6} xl={6}>
                        <span className="bold">Details</span>

                        </Grid>
                        <Grid item xs={0} sm={0} md={2} lg={2} xl={2}>
                        <span className="bold">Actions</span>

                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>   
        {patient &&
          patient.data &&
          patient.data.map((e, i) => (
            <>
              
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={9}
                xl={9}
                style={{ padding: "10px" }}
              >
                <div className="zetamed_patient_list_details_card">
                 
                  <Grid container style={{ padding: "2px" }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                      <Grid container>
                        <Grid item xs={5} sm={5} md={4} lg={4} xl={4}>
                          <Grid container>
                            <Grid
                              item
                              xs={12}
                              sm={12}
                              md={12}
                              lg={12}
                              xl={12}
                              style={{ display: "flex" }}
                            >
                              <div>
                                <img
                                  style={{ height: "60px" }}
                                  src={`${process.env.REACT_APP_BACKEND_URL}${e.patientImage}`}
                                  alt="avatar"
                                ></img>
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <span className="bold">Name:</span>{e.name}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={5} sm={5} md={6} lg={6} xl={6}>
                          <div><span className="bold">Age:</span> {e.age}</div>
                          <div><span className="bold">Email:</span> {e.email}</div>
                          <div><span className="bold">Mobile No:</span> {e.mobileNo}</div>
                          <div><span className="bold">Group:</span>20oct</div>
                          
                        </Grid>
                        <Grid item xs={0} sm={0} md={2} lg={2} xl={2} align='center' justify='center'>
                         
                              <Link to={`/patient/${e.id}`}>
                                <button style={{marginTop:'20px'}}>
                                <div className="left"></div>

                                  Full Info
                                  <div className="right"></div>

                            </button>
                            

                                
                              </Link>
                              
                          
                               
                           
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </>
          ))}
      </Grid>
    </Fragment>
  );
};

export default PatientList;
