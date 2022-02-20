import logo from './logo.svg';
import './App.css';
import Signup from '../src/Authentication/Signup'
import { BrowserRouter, Routes,
  Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
