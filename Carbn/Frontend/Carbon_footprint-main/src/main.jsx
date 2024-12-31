
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import FormPage from './components/FormPage.jsx'
const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'FormPage',
    element:<FormPage/>
  }
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}></RouterProvider>
)
