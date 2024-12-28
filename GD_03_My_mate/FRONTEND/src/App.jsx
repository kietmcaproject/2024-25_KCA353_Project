import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import SignUp from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Feed from "./Components/Feed/Feed";
import Home from "./Components/Home/Home";
import Future from "./Components/Future/Future";
import Network from "./Components/Network/Network";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Profile from "./Components/UserProfile/Profile/Profile";
import About from "./Components/UserProfile/About/About";
import UserPost from "./Components/UserProfile/UserPost/UserPost";
import Education from "./Components/UserProfile/Education/Education";
import Followers from "./Components/UserProfile/Followers/Followers";
import Followings from "./Components/UserProfile/Following/Following";
import Projects from "./Components/UserProfile/Followers/Followers";
import WebLinks from "./Components/UserProfile/WebLinks/WebLink";
import UserAgreement from "./Components/AgreementPrivacy/UserAgreement";
import PrivacyPolicy from "./Components/AgreementPrivacy/PrivacyPolicy";
import Error from "./Components/Error/Error";

function App() {
  return (
    <Router>
      <NavbarRender />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="/infuture" element={<Future />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/network"
          element={
            <ProtectedRoute>
              <Network />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/user-agreement" element={<UserAgreement />} />

        {/* Profile Routes */}
        <Route path="/user_profile/:userId" element={<Profile />}>
          <Route
            path="about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="education"
            element={
              <ProtectedRoute>
                <Education />
              </ProtectedRoute>
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="posts"
            element={
              <ProtectedRoute>
                <UserPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="followers"
            element={
              <ProtectedRoute>
                <Followers />
              </ProtectedRoute>
            }
          />
          <Route
            path="following"
            element={
              <ProtectedRoute>
                <Followings />
              </ProtectedRoute>
            }
          />
          <Route
            path="weblinks"
            element={
              <ProtectedRoute>
                <WebLinks />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
      <FooterRender />
    </Router>
  );
}

function NavbarRender() {
  const location = useLocation();
  // The Navbar should not be rendered on signup or login pages
  return location.pathname !== "/signup" &&
    location.pathname !== "/login" &&
    location.pathname !== "/" ? (
    <Navbar />
  ) : null;
}

function FooterRender() {
  const location = useLocation();
  // The Footer should not be rendered on signup or login pages
  return location.pathname !== "/signup" &&
    location.pathname !== "/login" &&
    location.pathname !== "/" ? (
    <Footer />
  ) : null;
}

export default App;
