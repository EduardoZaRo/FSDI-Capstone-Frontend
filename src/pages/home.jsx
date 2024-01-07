import './home.css';
import { useAuthContext } from '../state/authContext';
import { Link } from "react-router-dom";
function Home(){
    const auth = useAuthContext();

    return(
        <div className="page center flex-column home-page">
            <h1>XD</h1>
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