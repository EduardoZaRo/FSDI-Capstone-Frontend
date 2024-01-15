import './contact.css';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../state/authContext';
import SuperCaptcha from '../../components/superCaptcha';
import { useRef } from 'react';
function Contact(){
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});
    const auth = useAuthContext();
    const childRef = useRef(null);

    useEffect(function () {
    }, []);

    function verifyForm(){
        let catpchaErrorMessage = childRef.current.verifyCaptcha();
        if(email === ""){
            setFormError("Please enter your email");
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
            setFormError("Please enter a valid mail");
        }
        else if(name === ""){
            setFormError("Please enter your name");
        }
        else if(message === ""){
            setFormError("Please enter your message");
        }
        else if(catpchaErrorMessage !== ""){
            setFormError(catpchaErrorMessage);
        }
        else{
            setVerifySuccess("Valid form");
        }
    }
    function setVerifySuccess(alertText){
        setFormAlert({
            "text": alertText,
            "color": "form-success"
        });
    }
    function setFormError(alertText){
        setFormAlert({
            "text": alertText,
            "color": "form-warning"
        });
    }
    return(
        <div className="page flex-column center contact-page">
            <div className="contact-info">
                <h2>Tijuana, B.C.</h2>
                <p>Calzada Universidad 14418, Parque Industrial Internacional Tijuana, C.P. 22424</p>
            </div>
            <div className="flex form contact-form pop-up">
                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-envelope"></i>
                    </span>
                    <input
                        type="email"
                        id="user-email"
                        className=""
                        placeholder="Your email"
                        onChange={event => setEmail(event.target.value)}
                    />
                </div>
                <div className="flex input-group">
                    <span className="center">
                        <i className="bi bi-person"></i>
                    </span>
                    <input
                        type="text"
                        autoComplete="on"
                        id="user-name"
                        className=""
                        placeholder="Your name"
                        onChange={event => setName(event.target.value)}
                    />
                </div>
                <div className="flex input-group">
                    <span className="center">
                        <i class="bi bi-envelope-paper"></i>
                    </span>
                    <textarea
                        rows="10" 
                        rezisable={true}
                        autoComplete="on"
                        id="user-message"
                        className=""
                        placeholder="Your message"
                        onChange={event => setMessage(event.target.value)}
                    />
                </div>
                <SuperCaptcha ref={childRef}/>
                <div className={"form-alert " + formAlert.color} display={formAlert ? "show" : "none"}>{formAlert.text}</div>
                <button type="submit" className="" onClick={verifyForm}>
                Send <i class="bi bi-send"></i>
                </button>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13454.855437238004!2d-116.97084009372168!3d32.5337884190147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80d947c091d07945%3A0x65c5734b77863451!2sUABC%2C%2022424%20Tijuana%2C%20B.C.!5e0!3m2!1ses-419!2smx!4v1704589837707!5m2!1ses-419!2smx"
                style={{ 
                    border: 0, 
                    height: "100%",
                    width: "100%", 
                    marginTop: "50px" 
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />


        </div>
    )
}
export default Contact;