import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LogIn from '../components/LogIn.jsx';
import SignUp from '../components/SignUp.jsx';
import Explore from './Explore.jsx'
import Home from './Home.jsx';
import Dedicated_Stock from './explore_comp/Dedicated_Stock.jsx';
import Dedicated_Etf from './explore_comp/Dedicated_Etf.jsx';
import Dedicated_Trust from './explore_comp/Dedicated_Trust.jsx';

const App=()=>{
 return(
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signup" element={<SignUp/>}/> 
    <Route path="/explore" element={<Explore/>}/>
    <Route path="/dedi_stock" element={<Dedicated_Stock/>}/> 
    <Route path="/dedi_etf" element={<Dedicated_Etf/>}/> 
    <Route path="/dedi_trust" element={<Dedicated_Trust/>}/>
    </Routes>
    </BrowserRouter>
    </>
 )
}
export default App;
