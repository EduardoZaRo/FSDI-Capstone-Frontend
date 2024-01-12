import './App.css';
import './base.css';

import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import CreateDevice from './pages/createDevice/createDevice';
import StepOne from './pages/createDevice/stepOne';
import StepTwo from './pages/createDevice/stepTwo';
import StepThree from './pages/createDevice/stepThree';
import Dashboard from './pages/dashboard';
import DeviceView from './pages/deviceView';
import Login from "./pages/login";
import Logout from "./pages/logout";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPassword";
import ResetPasswordConfirm from "./pages/resetPasswordConfirm";
import ChangePassword from "./pages/changePassword";
import LoadingScreen from "./components/loadingScreen";
import Error404 from "./pages/error404";
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import './responsive.css';
import { useEffect, useState,useContext } from "react";

import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { useAuthContext} from "./state/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [csrftoken, setCSRFToken] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const auth = useAuthContext();
  useEffect(()=>{
    console.log(window)
    auth.isAuthenticated().then(()=>{
      setLoggedIn(true);
      auth.getAuthenticatedUser();
    }).catch(()=>{{
      setLoggedIn(false);
    }})
  }, []);
  const PrivateRoute = ({ children }) => {
    const auth = useAuthContext();
    console.log("private route", auth.user, children)
    return (
      auth.user ? children : <Navigate to="/login" state={{isRedirected: true}}/>
    )
  };

  return (
    <div className="App flex-column">
        <BrowserRouter>
          <Navbar loggedIn={loggedIn}/>
          <Routes>
            {/* Public routes */}
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/reset-password" element={<ResetPassword/>}/>
            <Route path="/reset-password/confirm" element={<ResetPasswordConfirm/>}/>
            <Route path="/error-404" element={<Error404/>}/>
            <Route path="/*" element={<Error404/>}/>

            {/* Private routes (need auth) */}
            <Route path="/create-device" element={<PrivateRoute><CreateDevice/></PrivateRoute>}/>
            <Route path="/step-one" element={<PrivateRoute><StepOne/></PrivateRoute>}/>
            <Route path="/step-two" element={<PrivateRoute><StepTwo/></PrivateRoute>}/>
            <Route path="/step-three" element={<PrivateRoute><StepThree/></PrivateRoute>}/>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path="/logout" element={<PrivateRoute><Logout setLoggedIn={setLoggedIn}/></PrivateRoute>}/>
            <Route path="/change-password" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
