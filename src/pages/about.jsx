import './about.css';
import aboutMeImg from "../assets/img/aboutme.jpg";
import aboutProjectImg from "../assets/img/aboutproject.jpg";
function About(){
    return(
        <div className="about-page page">
            <div className="about-me flex-column center">
                <h1>About me</h1>
                <div className="content-wrapper flex-column justify-center content-center">
                    <p>Hi! My name is Irvin. I'm a recent graduate in computer engineering from the UABC and a current student in the San Diego Global Knowledge University in the Fullstack development immersive course.</p>
                    <p> I have experience in high and low level programming languages, web development, artificial intelligence and embedded systems. </p>
                    <img src={aboutMeImg} alt="About me" className="about-img pulsing-box-shadow" />
                </div>
            </div>
            <div className="about-project flex-column center">
                <h2>About the project</h2>
                <div className="content-wrapper flex-column justify-center content-center">
                    <p>This project is inspired by the idea of making code easier and more accesible to non technologic people</p>
                    <p>With this code builder, you can create code faster than reading all the documentation by yourself and you can have full functional microcontroller based projects with a few steps</p>
                </div>
            </div>
        </div>
    );
}
export default About;