import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer/Footer';
import  '../Component/Universal.css'
import { RxCross2 } from "react-icons/rx";
// import './Profile.css';
import { Box, Container, Button, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({}); // Store user data here
  const navigate = useNavigate();

  const crosshandler = () => {
    navigate(-1);  // This navigates back to the previous page
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage
        const response = fetch(`https://project-hub-backend-seven.vercel.app/api/v1/users/${userId}`);
        // const response = await fetch(`http://localhost:5000/api/v1/users/${userId}`); // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data); // Set the user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Assuming user ID is stored in local storage
        const response = await fetch(`http://localhost:5000/api/v1/users/${userId}/projects`); // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.projects); // Set the projects array to state
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchUserData();
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: '20px' }}>
      
        <div className="max-w-2xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 profile-width-card">
        
        <div className="relative rounded-t-lg h-32 overflow-hidden">
  <RxCross2 className="absolute top-2 right-2 text-white bg-black rounded-full p-1 cursor-pointer" onClick={crosshandler}/>
  <img 
    className="object-cover object-top w-full h-full" 
    src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" 
    alt="Mountain" 
  />
</div>
          <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
            <img className="object-cover object-center h-32" 
                 src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" 
                 alt="User" />
          </div>
          <div className="text-center mt-2">
            <h2 className="font-semibold">{user.name || 'User Name'}</h2>
            <p className="text-gray-500">{user.role || 'Role'}</p>
          </div>
          <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
            <li className="flex flex-col items-center justify-around">
              <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <div>{projects.length} Projects</div>
            </li>
            {/* Add more metrics as needed */}
          </ul>
          <div className="p-4 border-t mx-8 mt-2">
            <Button variant="contained" color="primary" className="w-1/2 block mx-auto rounded-full hover:shadow-lg font-semibold text-white">
              Follow
            </Button>
          </div>
        </div>

        <Typography variant="h4" gutterBottom sx={{ marginTop: '20px' }}>
          My Projects
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {projects.map(project => (
            <Card key={project._id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={project.imageUrl} // Ensure this field matches your project object
                alt={project.title} // Ensure this field matches your project object
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {project.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/project/${project._id}`}>View</Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
