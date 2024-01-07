import "./navbar.css";
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useAuthContext } from "../state/authContext";
function Navbar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const publicLinks = [
        { link: "/about", text: "About Us" },
        { link: "/contact", text: "Contact" },
    ];
    const notAuthenticatedLinks = [
        { link: "/", text: "Home" },
        { link: "/login", text: "Login" },
        { link: "/register", text: "Register" },
        { link: "/reset-password", text: "Reset password" },
    ];
    const authenticatedLinks = [
        { link: "/create-device", text: "New device" },
        { link: "/dashboard", text: "Dashboard" },
        { link: "/change-password", text: "Change password" },
        { link: "/logout", text: "Logout" },
    ];
    const auth = useAuthContext();
    const toggleCollapse = () => {
        document.getElementById("nav-check").checked = !isOpen;
        document.getElementById("nav-check").classList.add("clicked");
        setIsOpen(!isOpen);
    }
    return (
        <header className="navbarcomponent flex">
            <h1 className="blockcode-title">Name<span>_</span>™</h1>
            
            <nav>
                <input type="checkbox" id="nav-check" onClick={toggleCollapse}/>
                <div className="nav-btn">
                    <label htmlFor="nav-check">
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>
                </div>
                <div className="navbar-links flex">
                {
                    publicLinks.map(
                        (link) => (
                            <Link to={link.link} className="" onClick={toggleCollapse} key={link.text}>{link.text}</Link>
                        )
                    )
                }
                {
                    auth.user ? 
                    authenticatedLinks.map(
                        (link) => (
                            <Link to={link.link} className="" onClick={toggleCollapse} key={link.text}>{link.text}</Link>
                        )
                    )

                    :
                    notAuthenticatedLinks.map(
                        (link) => (
                            <Link to={link.link} className="" onClick={toggleCollapse} key={link.text}>{link.text}</Link>
                        )
                    )
                }
                </div>

            </nav>

        </header>
    );
}

export default Navbar;