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
import SetPassword from "./components/login/SetPassword";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path={'/login'} element={<Login/>}  />
      <Route exact path={'/singup'} element={<Singup />}  />
      <Route exact path={'/forgot'} element={<Forgot />}  />
      <Route exact path={'/emailOtp'} element={<EmailOtp />}  />
      <Route exact path={'/setPassword'} element={<SetPassword />}  />
      <Route exact path={'/'} element={<Home/>}  />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
