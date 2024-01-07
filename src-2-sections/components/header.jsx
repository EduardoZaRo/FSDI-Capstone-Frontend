import "./header.css";
import {Link} from "react-router-dom";
function Header() {
    return (
        <header className="headercomponent">
            <h1>HEADER</h1>
            <div className="links flex-row">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>

        </header>
    );
}

export default Header;