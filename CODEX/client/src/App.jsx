import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import EditorPage from './pages/EditorPage.jsx';
import ContributorsPage from './pages/contributer.jsx';
import Home from './pages/JoinPage.jsx';
import SignUp from './pages/Signup';  
import Login from './pages/Login';
import ProtectedRoute from './comp/ProtectedRoute';
// import RoomList from './pages/RoomList';

const App = () => (
  <>
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      />
    </div>
    <BrowserRouter>
      <Routes> 
        {/* 
        <Route path="/rooms" element={<RoomList />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/ContributorsPage" element={<ContributorsPage />} />
        
        <Route
          path="/editor/:roomId"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
