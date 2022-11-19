import Home from "./components/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login/Login";
import Singup from "./components/login/Singup";
import EmailOtp from "./components/login/EmailOtp";
import SetPassword from "./components/login/SetPassword";
import ForgotPassword from "./components/login/ForgotPassword";
import ForgotOtp from "./components/login/ForgotOtp";
import RecoverPassword from "./components/login/RecoverPassword";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path={'/login'} element={<Login/>}  />
      <Route exact path={'/singup'} element={<Singup />}  />
      <Route exact path={'/forgot'} element={<ForgotPassword />}  />
      <Route exact path={'/forgotOtp'} element={<ForgotOtp />}  />
      <Route exact path={'/recoverPassword'} element={<RecoverPassword />}  />
      <Route exact path={'/emailOtp'} element={<EmailOtp />}  />
      <Route exact path={'/setPassword'} element={<SetPassword />}  />
      <Route exact path={'/'} element={<Home/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
