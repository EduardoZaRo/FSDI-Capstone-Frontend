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
import DeviceDetails from './pages/deviceDetails';
import DeviceView from './pages/deviceView';
import Login from "./pages/login";
import Logout from "./pages/logout";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPassword";
import ResetPasswordConfirm from "./pages/resetPasswordConfirm";
import ChangePassword from "./pages/changePassword";
import LoadingScreen from "./components/loadingScreen";
import Error404 from "./pages/error404";
import About from './pages/about';
import Contact from './pages/contact';
import './responsive.css';
import { useEffect, useState,useContext } from "react";
import { LoaderProvider } from './state/loaderContext';
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { useAuthContext} from "./state/authContext";
import { useLoader } from "./state/loaderContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(null);
  const [csrftoken, setCSRFToken] = useState(null);
  const [userProfile, setUserProfile] = useState({});

  const [checkboxTermsAgree, setCheckboxTermsAgree] = useState(false);
  const [termsAgree, setTermsAgree] = useState(false);

  const { loading, showLoader, hideLoader } = useLoader();
  const auth = useAuthContext();
  useEffect(()=>{
    console.log("Appjs loading", auth)
    if(localStorage.getItem("terms") === "accepted"){
      setTermsAgree(true);
    }
    showLoader("Checking open session...");
    auth.isAuthenticated().then(()=>{
      auth.getCSRFToken();
      setLoggedIn(true);
      auth.getAuthenticatedUser().then((response)=>{auth.setUser(response.data);})
      hideLoader();
    }).catch(()=>{{
      setLoggedIn(false);
      hideLoader();
    }})
  }, []);
  const PrivateRoute = ({ children }) => {
    console.log("private route", auth.user, loggedIn,children)
    // if(auth.loading === true ) return <LoadingScreen/>
    if (!loggedIn) {
      // Redirige a la página de inicio de sesión si el usuario no está autenticado
      // Puedes personalizar la ruta de redirección según tus necesidades.
      return <Navigate to="/login" state={{isRedirected: true}}/>
    }
    return (
      <>  
      {/* {auth.getGlobalLoading() === true && <LoadingScreen/>}  */}
      {loggedIn === true && loading === false ? children : <Navigate to="/login" state={{isRedirected: true}}/>}
      </>
        
        // loggedIn === true ? children : <Navigate to="/login" state={{isRedirected: true}}/>
    );
  };


  function checkboxAgreeTermsHandler(){
    setCheckboxTermsAgree(!checkboxTermsAgree);
  }
  function btnAgreeTermsHandler(e){
    if(document.getElementById("agree").value){
      setTermsAgree(true);
      localStorage.setItem("terms", "accepted");
    }
  }
  return (
    <LoaderProvider>
      <LoadingScreen/>



      {termsAgree ? <div className="App flex-column">
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
              <Route path="/device-details" element={<PrivateRoute><DeviceDetails/></PrivateRoute>}/>
              <Route path="/logout" element={<PrivateRoute><Logout/></PrivateRoute>}/>
              <Route path="/change-password" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
            </Routes>
            <Footer/>
          </BrowserRouter>
      </div> :       
      
      <div className="terms-container page" style={{display: termsAgree ? "none" : "flex"}}>
        <div>
          <input type="checkbox" id="agree" onChange={checkboxAgreeTermsHandler}/>
          <label htmlFor="agree">I agree to <a target="_blank" href="https://www.termsandconditionsgenerator.com/download.php?lang=en&token=KYPnLOaYnsspCA7DjPFWpytcTENiNbD5#">terms and conditions</a></label>
        </div>
        <button disabled={!checkboxTermsAgree} className="" onClick={btnAgreeTermsHandler} type="submit">
          Continue
        </button>
      </div>}
    </LoaderProvider>
  );
}

export default App;
