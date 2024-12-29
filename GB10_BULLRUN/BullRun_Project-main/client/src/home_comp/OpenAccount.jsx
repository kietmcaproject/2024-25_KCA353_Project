
import './home_comp.css';
import logo from '/BullLogo.png';
import { useNavigate } from "react-router-dom"
const OpenAccount=()=>{
    const navigate = useNavigate();
    const RedirectToSignup=()=>{
        navigate('/signup');
    }
 return (
    <>
    <div>
    <div id="hero">
        <h1>Open a <img src={logo} id='open_logo'/> account</h1>
        <p>Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.</p>
        <button onClick={RedirectToSignup}>Signup For Free</button>
    </div>
</div>

    </>
 )
}

export default OpenAccount