import Home from "./components/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login/Login";
import Singup from "./components/login/Singup";
import Forgot from "./components/login/Forgot";
import EmailOtp from "./components/login/EmailOtp";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={'/login'} element={<Login/>}  />
      <Route path={'/singup'} element={<Singup />}  />
      <Route path={'/forgot'} element={<Forgot />}  />
      <Route path={'/emailOtp'} element={<EmailOtp />}  />
      <Route path={'/'} element={<Home/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
