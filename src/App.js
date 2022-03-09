import Registration from './Components/Authentication/Registration'
import Prodected from './Components/Routers/Prodected'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import Otp from './Components/Authentication/Otp';
import ResetPasswordEmail from './Components/Authentication/ResetPasswordEmail';
import ResetPassword from './Components/Authentication/ResetPassword';
import PasswordChange from './Components/Authentication/PasswordChange';
import ProfileChange from './Components/Authentication/ProfileChange';
import Profile from './Components/Authentication/Profile';

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/otp-verify" component={Otp} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/password-reset-email" component={ResetPasswordEmail} />
        <Route exact path="/password-reset/:token" component={ResetPassword} />

        
    {/* Prodected Route */}
    <Prodected exact path="/password-change" component={PasswordChange} />
        <Prodected exact path="/profile" component={Profile} />
        <Prodected exact path="/profile-change" component={ProfileChange} />
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
