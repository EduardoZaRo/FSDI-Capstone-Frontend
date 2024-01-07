import './superCaptcha.css';
import { useState, useEffect,forwardRef, useRef, useImperativeHandle } from 'react';
const  SuperCaptcha = forwardRef((props, ref) => {
    const [firstCaptchaNumber, setFirstCaptchaNumber] = useState(0);
    const [secondCaptchaNumber, setSecondCaptchaNumber] = useState(0);
    const [expectedCaptchaResult, setExpectedCaptchaResult] = useState(0);
    const [userCaptchaResult, setUserCaptchaResult] = useState(-1);
    const [formAlert, setFormAlert] = useState({"text":"", "color":""});

    useEffect(function () {
        generateCaptcha();
    }, []);
    useImperativeHandle(ref, () => ({
        verifyCaptcha(){
            let errorMessage = "";
            if(userCaptchaResult === -1){
                errorMessage = "Please enter a captcha value";
            } 
            else if (userCaptchaResult !== expectedCaptchaResult){
                errorMessage = "Incorrect captcha result";
            }
            return errorMessage;
        },
        reGenerateCaptcha(){
            generateCaptcha();
        },
    }))

    function generateCaptcha(){
        let firstNumber = getRandomNumber(100),
            secondNumber = getRandomNumber(100);
        setFirstCaptchaNumber(firstNumber);
        setSecondCaptchaNumber(secondNumber);
        setExpectedCaptchaResult(firstNumber + secondNumber);
    }
    function getRandomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    return(
        <div className="flex center supercaptcha-component">
            <label
                htmlFor="user-smart-captcha"
                className=""
            >
            {firstCaptchaNumber} + {secondCaptchaNumber} = 
            </label>
            <input 
                type="number"  
                id="user-smart-captcha"
                className="captcha-input"
                placeholder="Captcha result"
                onChange={event => setUserCaptchaResult(parseInt(event.target.value))}
            />
        </div>
    );
})
export default SuperCaptcha;