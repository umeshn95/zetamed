import Registration from './Components/Authentication/Registration'
import Prodected from './Components/Routers/Prodected'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Authentication/Login';

// Authentications
import Otp from './Components/Authentication/Otp';
import ResetPasswordEmail from './Components/Authentication/ResetPasswordEmail';
import ResetPassword from './Components/Authentication/ResetPassword';
import PasswordChange from './Components/Authentication/PasswordChange';
import ProfileChange from './Components/Authentication/ProfileChange';
import Profile from './Components/Authentication/Profile';

// Patient
import PatientList from './Components/Patient/PatientList';
import PatientInfo from './Components/Patient/PatientInfo';
import Loader from './Components/Loading/Loader';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>

      {/* Authentications */}
        <Route exact path="/otp-verify" component={Otp} />
        <Route exact path="/registration" component={Registration} />
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

      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
