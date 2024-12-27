import {useGoogleLogin} from '@react-oauth/google'
import 'bootstrap/dist/css/bootstrap.min.css';
const GoogleLogIn=()=>{
    const responseGoogle = async (authResult)=>{
        try {
            if(authResult['code']){
                
            }
        } catch (error) {
            console.log(error);
        }
    }
    const Googli=useGoogleLogin({
        onSuccess:responseGoogle,
        onError:responseGoogle,
        flow:'auth-code'
    })
    return(
        <>
        <div className="app">
            <button className="btn btn-outline-primary" onClick={Googli}>
                login
            </button>
        </div>

        </>
    )
}
export default GoogleLogIn;