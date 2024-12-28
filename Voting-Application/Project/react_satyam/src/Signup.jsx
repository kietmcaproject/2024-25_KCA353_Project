import {useState} from 'react';
import './Sign.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3001/register',{name,email,password})
    // axios.post('https://react-satyam3.onrender.com/register',{name,email,password})
    .then(result => {console.log(result)
      navigate('/login')
    })
    .catch(err => console.log(err))
   
  }
  return (
    <div className="signup">
    <div className="form-container">
      <p className="title">Register</p>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" className="input" placeholder="Username" onChange={(e)=> setName(e.target.value)} />
        <input type="email" className="input" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
        <input type="password" className="input" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit" className="form-btn">Sign Up</button>
      </form>
      <p className="sign-up-label">
        Already have an account?<span className="sign-up-link"><Link to="/login" className="sign-up-link"> Log in</Link></span>
      </p>
    </div>
    </div>
  );
};

export default Signup;
