import logo from './logo.svg';
import './App.css';
import Signup from '../src/Authentication/Signup'
import { BrowserRouter, Routes,
  Route } from "react-router-dom";
import Signin from './Authentication/Signin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
