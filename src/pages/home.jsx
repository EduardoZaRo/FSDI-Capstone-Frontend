import './home.css';
import { useAuthContext } from '../state/authContext';
import { Link } from "react-router-dom";
import Image from "../assets/img/aboutproject.jpg";
import CircuitImage from "../assets/img/home-1.png";
import FormImage from "../assets/img/home-2-5.png";
import CodeImage from "../assets/img/home-3-5.png";
import DeviceImage from "../assets/img/home-4-5.png";
import { useEffect, useState } from 'react';
function Home(){
    const auth = useAuthContext();
    const maxSections = 3;
    console.log("maxSections",maxSections)
    let currentSection = 0;
    // const [currentSection, setCurrentSection] = useState(0);
    useEffect(()=>{
        currentSection = 0;
        function sectionNavigation(event){
            let prevSection = currentSection;
            if (event.deltaY < 0){ //scroll up
                decrementCurrentSection();
                console.log('scrolling up', currentSection, prevSection);
                
            }
            else if (event.deltaY > 0){ //scroll down
                incrementCurrentSection()
                console.log('scrolling down', currentSection, prevSection);
                
            }
            document.querySelectorAll(".home-page .page-section *").forEach((section)=>{
                section.classList.remove("pop-up")
                section.classList.remove("slide-in-left")
                section.classList.remove("slide-in-right")
                section.classList.remove("slide-in-top")
                section.classList.remove("slide-in-bottom")
                section.classList.remove("slide-out-left")
                section.classList.remove("slide-out-right")
                section.classList.remove("slide-out-top")
                section.classList.remove("slide-out-bottom")
            });
            const section = document.getElementById("section-"+currentSection);
            const image = document.querySelector("#section-"+currentSection+" > img");
            const text = document.querySelector("#section-"+currentSection+" > div");
            window.scrollTo({
                top: section.getBoundingClientRect().top + window.scrollY - 60,
                behavior: 'smooth'
            });
            if(currentSection === 0 && prevSection !== 0){
                image.classList.add('slide-in-top');
                text.classList.add('slide-in-bottom');
            }
            if(currentSection === 1){
                image.classList.add('slide-in-top');
                text.classList.add('slide-in-bottom');
            }
            if(currentSection === 2){
                image.classList.add('slide-in-bottom');
                text.classList.add('slide-in-top');
            }
            if(currentSection === (maxSections-1) && prevSection === (maxSections)){
                image.classList.add('slide-in-bottom');
                text.classList.add('slide-in-top');
            }
            // if(currentSection === (maxSections-1) && prevSection === (maxSections)){
            //     const image = document.querySelector("#section-"+prevSection+" > img:first-child");
            //     const image2 = document.querySelector("#section-"+prevSection+" > img:last-child");
            //     image.classList.add('slide-out-right');
            //     image2.classList.add('slide-out-left');
            // }
            // else if(currentSection === (maxSections) && prevSection == (maxSections-1)){
            //     console.log("xd")
            //     const image2 = document.querySelector("#section-"+currentSection+" > img:last-child");
            //     image.classList.add('slide-in-right');
            //     image2.classList.add('slide-in-left');
            // }
        }
        window.addEventListener('wheel', sectionNavigation);
        return () =>{ window.removeEventListener('wheel', sectionNavigation); window.scrollTo({top: 0});};
     }, [/*maxSections*/]);

    const incrementCurrentSection = (() => {if(currentSection < maxSections) currentSection++});
    const decrementCurrentSection = (() => {if(currentSection > 0) currentSection--});
    return(
        <div className="flex-column home-page">
            <div id="section-0" className="flex center page-section full-height">
                <img src={CircuitImage} alt="Circuit" style={{objectFit:"contain"}}/>
                <div className="section-text-container center flex-column">
                    <h2>Welcome to</h2> <h1 className="blockcode-title">Kodeasy<span>_</span>™</h1>
                    <p>A new platform where creating code is easier than ever</p>
                </div>
            </div>
            <div id="section-1" className="flex center page-section full-height">
                <div className="section-text-container center flex-column">
                    <h2>Simple forms</h2>
                    <p>Just need to fill a simple form to create new code!</p>
                </div>
                <img src={FormImage} alt="Best forme ever" style={{objectFit:"contain"}}/>
            </div>
            <div id="section-2" className="flex center page-section full-height">
                <img src={CodeImage} alt="Code sample" style={{objectFit:"contain"}}/>
                <div className="section-text-container center flex-column">
                    <h2>Easy code generation</h2>
                    <p>Generate functional code in seconds!</p>
                </div>
            </div>
            <div id="section-3" className="flex center page-section full-height">
                <div className="section-text-container center flex-column">
                    <h2>Simple design</h2>
                    <p>All your circuits in one place</p>
                </div>
                <img src={DeviceImage} alt="Device sample" style={{objectFit:"contain"}}/>
            </div> 
        </div>
    );
}
export default Home;