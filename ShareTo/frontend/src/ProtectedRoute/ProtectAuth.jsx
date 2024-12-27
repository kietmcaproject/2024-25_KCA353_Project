import { Navigate } from "react-router-dom";
const ProtectedAuth = ({children}) => {
    const token = localStorage.getItem('token');
    if(token){
        return children;
    }else{
        return <Navigate to='/Login'/>
    }
}

export default ProtectedAuth;