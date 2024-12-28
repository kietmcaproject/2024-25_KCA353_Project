import { useNavigate } from "react-router-dom"
import  logo from '/BullLogo.png'
import '../src/index.css'
const SignUp=()=>{
    const navigate = useNavigate();
    const redirectToLogin=()=>{
        navigate('/login');
    }
    return (
        <>
        <div id="signup">
                <img src={logo} alt="" />
                
                <form action="#">
                    <input type="username" name="name" id="signup-form-username" placeholder="UserName" />
                    <input type="email" name="email" id="signup-form-email" placeholder='E-Mail' />
                    <input type="password" name="pass" id="signup-form-pass" placeholder='Password' />
                    <button type="button" className='button'>SignUp</button>
                </form>
                <hr />
                <div id='signup-login'>


                <p>if you are an existing user?</p>
                <button className='button' onClick={redirectToLogin}>LogIn</button>
                </div>
            </div>
        </>
    )
}
export default SignUp;