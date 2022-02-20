//automate main div-

import  Grid  from '@mui/material/Grid';
import React from 'react';
import './styles.css'
const Signin = () => {
    return <div className='Signin_main'>
      
        <div className='Signin_sub'>
            
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className='Signin_head'>Login to Healcon.com Forgot Password?</div>
                    <div className='Signin_box'>
                    <div className='Signin_email'> Email Id <input type='text'></input></div>
                    <div className='Signin_password'>Password <input type='text'></input></div>
                    <div className='Signin_login'> Login</div>
                    <div className='Signin_forgot_password'>Forgot Password? Click here to reset</div>
                    <div className='Signin_forgot_dont_have_account'>(Don't have an account yet? Signup and join our healthcare network)</div>

                        </div>

                </Grid>
               
    </Grid>
        </div>
  </div>;
};

export default Signin;