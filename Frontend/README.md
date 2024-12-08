# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Making endpoint to demonstrate API request, response transaction:
User Route

Product Route
Authentication Route 
This route is for Sending Authentication Request 
1. Register : this end point is mode to create new USer into the database and frondend will recieve response as a  cookie.
URL = "https://greenloop-nw0w.onrender.com/api/v1/auth/register"
mathod = "POST"
JSON body: 
{
    "name":"gautam",
    "phone":"0926172340",
    "email":"gautam@gmail.com",
    "password":"secret"
}

2. LogIn : This endpoint is to login an already registered user and front end will recieve cookie.
URL: "https://greenloop-nw0w.onrender.com/api/v1/auth/login"
method: "POST"
JSON body: 
{
    "identifier":"9109390639",
    "password":"secret"
}

3. Logout : This logout is assigned to logout the user and remove cookie instantly.
URL: "https://greenloop-nw0w.onrender.com/api/v1/auth/logout"
method: "GET"
no body required