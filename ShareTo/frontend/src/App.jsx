import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Reciever from "./pages/Reciever";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sender from "./pages/Sender";
import Profile from "./pages/Profile";
import ProtectedAuth from "./ProtectedRoute/ProtectAuth"
function App() {
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route
            path="/"
            element={
              
                <ProtectedAuth>
                  <Dashboard />
                </ProtectedAuth>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <ProtectedAuth>
              <Dashboard />
            </ProtectedAuth>
            }
          />
          <Route
            path="/Reciever"
            element={
              <ProtectedAuth>
              <Reciever />
            </ProtectedAuth>
            }
          />
          <Route
            path="/Sender"
            element={
              <ProtectedAuth>
              <Sender />
            </ProtectedAuth>
            }
          />
          <Route
            path="/Login"
            element={
                <Login />
            }
          />
          <Route
            path="/Signup"
            element={
                <Signup />
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedAuth>
              <Profile />
            </ProtectedAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
