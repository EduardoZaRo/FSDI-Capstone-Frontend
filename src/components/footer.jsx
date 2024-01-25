import "./footer.css";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthContext } from "../state/authContext";
function Footer() {
    const auth = useAuthContext();

    return (
        <footer className="footercomponent flex center">
            <h2 className="blockcode-title">Kodeasy<span>_</span>™</h2>
            <nav className="nav-footer center">
                <Link to="/">Home</Link>
                <Link to="/about">About us</Link>
                <Link to="/contact">Contact</Link>
                
            </nav>

            
            {
            auth.user ? 
                <div className="logged-user flex center">
                    <i className="bi bi-person-check"></i>
                    <a>{auth.user.email}</a>
                </div> 
            : 
                <Link to="/login">Login</Link>
            }
        </footer>
    );
}

export default Footer;