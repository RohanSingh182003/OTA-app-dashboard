import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Singup from "./components/login/Singup";
import EmailOtp from "./components/login/EmailOtp";
import SetPassword from "./components/login/SetPassword";
import ForgotPassword from "./components/login/ForgotPassword";
import ForgotOtp from "./components/login/ForgotOtp";
import RecoverPassword from "./components/login/RecoverPassword";
import PageNotFound from "./components/404/PageNotFound";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path={'*'} element={<PageNotFound />}  />
      <Route exact path={'/login'} element={<Login/>}  />exact
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
