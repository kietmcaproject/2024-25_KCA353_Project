import '../src/index.css'
import logo from '/BullLogo.png'
import {useNavigate} from 'react-router-dom';
const LogIn = () => {
    const navigate = useNavigate();
    const redirectToSignup=()=>{
          navigate('/signup');
    }
    return (
        <>
            <div id="login">
                <img src={logo} alt="" />
                
                <form action="#">
                    
                    <input type="email" name="email" id="login-form-email" placeholder='E-Mail' />
                    <input type="password" name="pass" id="login-form-pass" placeholder='Password' />
                    <button type="button" className='button'>LogIn</button>
                </form>
                <hr />
                <div id='login-signup'>


                <p>if you are new?</p>
                <button className='button' onClick={redirectToSignup}>SignUp</button>
                </div>
            </div>
        </>
    )
}
export default LogIn;