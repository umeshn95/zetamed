import Registration from './Components/Authentication/Registration'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Authentication/Login';
import Otp from './Components/Authentication/Otp';
import ResetPasswordEmail from './Components/Authentication/ResetPasswordEmail';
import ResetPassword from './Components/Authentication/ResetPassword';

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
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
