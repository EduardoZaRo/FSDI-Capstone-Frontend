import './home.css';
import { useAuthContext } from '../state/authContext';
import { Link } from "react-router-dom";
import Image from "../assets/img/aboutproject.jpg";
import { useEffect, useState } from 'react';
function Home(){
    const auth = useAuthContext();
    const maxSections = 2;
    let currentSection = 0;
    // const [currentSection, setCurrentSection] = useState(0);
    useEffect(()=>{
        function sectionNavigation(event){
            let prevSection = currentSection;
            if (event.deltaY < 0){ //scroll up
                decrementCurrentSection()
                console.log('scrolling up', currentSection);
                
            }
            else if (event.deltaY > 0){ //scroll down
                incrementCurrentSection()
                console.log('scrolling down', currentSection);
                
            }
            document.querySelectorAll(".home-page .page-section").forEach((section)=>{
                section.classList.remove("pop-up")
                section.classList.remove("slide-to-left")
                section.classList.remove("slide-to-right")
            });

            const element = document.getElementById("section-"+currentSection);
            
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY - 60,
                behavior: 'smooth'
            });
            if(currentSection === 0 && prevSection !== 0)
                element.classList.add('pop-up');
            if(currentSection === 1)
                element.classList.add('slide-to-left');
            if(currentSection === 2 && prevSection !== 2)
                element.classList.add('slide-to-right');
        }
        window.addEventListener('wheel', sectionNavigation);
        return () =>{ window.removeEventListener('wheel', sectionNavigation); window.scrollTo({top: 0});};
    }, []);

    const incrementCurrentSection = (() => {if(currentSection < maxSections) currentSection++});
    const decrementCurrentSection = (() => {if(currentSection > 0) currentSection--});
    return(
        <div className="flex-column home-page">
            <div id="section-0" className="flex page-section full-height">
                <img src={Image} alt="XD" />
                <div className="section-text-container center flex-column">
                    <h2>Inicio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad cumque illo dolores similique. Dolores similique totam natus harum nostrum laborum quibusdam optio, dolorem sint omnis sit</p>
                </div>
            </div>
            <div id="section-1" className="flex page-section full-height">
                <div className="section-text-container center flex-column">
                    <h2>Inicio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad cumque illo dolores similique. Dolores similique totam natus harum nostrum laborum quibusdam optio, dolorem sint omnis sit</p>
                </div>
                <img src={Image} alt="XD" />
            </div>
            <div id="section-2" className="flex page-section center full-height">
                <img src={Image} alt="XD" />
                <img src={Image} alt="XD" />
            </div>


            {
                auth.user ?     
                <div>
                    <p>Hello {auth.user.email}</p>
                    <Link to="/create-device">New device</Link> 
                </div>

                :
                undefined
            }
            
            
        </div>
    );
}
export default Home;