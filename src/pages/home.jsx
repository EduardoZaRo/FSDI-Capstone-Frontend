import './home.css';
import { useAuthContext } from '../state/authContext';
import { Link } from "react-router-dom";
import Image from "../assets/img/aboutproject.jpg";
function Home(){
    const auth = useAuthContext();

    return(
        <div className="flex-column home-page">
            <div className="flex page-section slide-to-left">
                <img src={Image} alt="XD" />
                <div className="section-text-container center flex-column">
                    <h2>Inicio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad cumque illo dolores similique. Dolores similique totam natus harum nostrum laborum quibusdam optio, dolorem sint omnis sit, molestias iure, voluptates dolor doloremque molestiae veniam blanditiis doloribus quaerat! Odio maiores maxime dolorem enim praesentium aspernatur, omnis provident quo aliquid commodi culpa laborum laudantium tenetur! Odio doloremque consequuntur culpa illo! Labore, distinctio.</p>
                </div>
            </div>
            <div className="flex page-section slide-to-right">
                <div className="section-text-container center flex-column">
                    <h2>Inicio</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ad cumque illo dolores similique. Dolores similique totam natus harum nostrum laborum quibusdam optio, dolorem sint omnis sit, molestias iure, voluptates dolor doloremque molestiae veniam blanditiis doloribus quaerat! Odio maiores maxime dolorem enim praesentium aspernatur, omnis provident quo aliquid commodi culpa laborum laudantium tenetur! Odio doloremque consequuntur culpa illo! Labore, distinctio.</p>
                </div>
                <img src={Image} alt="XD" />
            </div>
            <div className="flex page-section center">
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