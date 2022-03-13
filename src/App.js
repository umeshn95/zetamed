import Registration from './Components/Authentication/Registration'
import Prodected from './Components/Routers/Prodected'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';



// Authentications
import Otp from './Components/Authentication/Otp';
import Login from './Components/Authentication/Login';
import ResetPasswordEmail from './Components/Authentication/ResetPasswordEmail';
import ResetPassword from './Components/Authentication/ResetPassword';
import PasswordChange from './Components/Authentication/PasswordChange';
import ProfileChange from './Components/Authentication/ProfileChange';
import Profile from './Components/Authentication/Profile';

// Patient
import PatientList from './Components/Patient/PatientList';
import PatientInfo from './Components/Patient/PatientInfo';
import AddPatient from './Components/Patient/AddPatient';

import Calender  from './Components/CommandComponent/Calender'
import Loader from './Components/Loading/Loader';


function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>

      {/* Authentications */}
        <Prodected exact path="/otp-verify" component={Otp} />
        <Prodected exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/password-reset-email" component={ResetPasswordEmail} />
        <Route exact path="/password-reset/:token" component={ResetPassword} />
        <Route exact path="/loader" component={Loader} />
        <Prodected exact path="/password-change" component={PasswordChange} />
        <Prodected exact path="/profile" component={Profile} />
        <Prodected exact path="/profile-change" component={ProfileChange} />

       {/*Patients  */}
       <Prodected exact path="/patient" component={PatientList} />
       <Prodected exact path="/patient/:id" component={PatientInfo} />
       <Prodected exact path="/add-patient" component={AddPatient} />
       <Prodected exact path="/calender" component={Calender} />

      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
