import React from 'react'
import ReactDOM from 'react-dom/client'
import Index from './Index'
import './index.css'
import Login from './Login'
import Signup from './Signup'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import QuizPage from './QuizPage';
import Dashboard2 from './Dashboard2'
import Score from './Score'
import Quiz from './Quiz'
import Profile from './Profile'
import store from './redux/store';
import { Provider } from 'react-redux';


const router=createBrowserRouter(
  [
    {
      path :"/",
      element :<Index/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/Signup",
      element:<Signup/>
    },
    {
      path:"/Dashboard",
      element:<Dashboard2/>
    },
    {
      path:"Dashboard/Score",
      element:<Score/>
    },
    {
      path:"Dashboard/Quiz",
      element:<Quiz/>
    },
    {
      path:"Dashboard/Profile",
      element:<Profile/>
    },
    {
      path:"Dashboard/QuizPage",
      element:<QuizPage/>
    },
    {
      path:"/Quiz",
      element:<Quiz/>
    },
    {
      path:"/Score",
      element:<Score/>
    }
  ]
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* Use capital "P" here */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
