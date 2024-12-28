import React, { useState, useEffect } from 'react';
import { FolderPlus } from 'lucide-react';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer/Footer';
import TextField from '@mui/material/TextField'; // Import TextField from Material UI
// import "./CreateProject.css"

// Reuse the GlowingOrb component
const GlowingOrb = ({ delay = 0, color1, color2 }) => (
  <div 
    className="absolute rounded-full animate-pulse blur-xl opacity-20"
    style={{
      background: `radial-gradient(circle at center, ${color1}, ${color2})`,
      width: `${200 + Math.random() * 300}px`,
      height: `${200 + Math.random() * 300}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      transform: 'translate(-50%, -50%)',
    }}
  />
);

const CreateProject = () => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    creator: '',
    image: null,
    links: { github: '', liveDemo: '', other: '' },
    sourceCode: '',
    category: '',
    rating: 3,
    dateCreated: new Date().toISOString().substring(0, 10),
    lastUpdated: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    setMounted(true);
    const userId = getLoggedInUserId();
    if (userId) {
      setFormData(prev => ({ ...prev, creator: userId }));
    }
  }, []);

  const getLoggedInUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      return user.id;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'links') {
        Object.keys(formData.links).forEach(linkKey => {
          formDataToSend.append(`links[${linkKey}]`, formData.links[linkKey]);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      // const response = fetch(`https://project-hub-backend-seven.vercel.app/api/v1/add-project`);
      //http://localhost:5000/api/v1
      const response = await fetch('https://project-hub-backend-seven.vercel.app/api/v1/add-project', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Project created successfully!');
        window.location.href = '/home';
      } else {
        alert('Failed to create project. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Error occurred during submission.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-slate-900 flex items-center justify-center p-4 overflow-hidden">
        {/* Rest of your JSX remains the same */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          
          <GlowingOrb color1="#4F46E5" color2="#2563EB" delay={0} />
          <GlowingOrb color1="#7C3AED" color2="#4F46E5" delay={2} />
          <GlowingOrb color1="#2563EB" color2="#3B82F6" delay={4} />
        </div>

        <div 
          className={`relative w-full max-w-2xl transform transition-all duration-1000
            ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden
            border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 rounded-full bg-blue-500/10 mb-4">
                <FolderPlus size={40} className="text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Create New Project</h2>
              <p className="text-gray-400">Share your amazing work with the community</p>
            </div>

            <form onSubmit={submitHandler} encType="multipart/form-data">
              <TextField
                label="Project Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: '24px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1f2937',
                    borderRadius: '8px',
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4F46E5',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                  },
                }}
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: '24px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1f2937',
                    borderRadius: '8px',
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4F46E5',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                  },
                }}
              />

              <TextField
                label="Technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: '24px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1f2937',
                    borderRadius: '8px',
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4F46E5',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                  },
                }}
              />

              <TextField
                label="GitHub Link"
                name="links.github"
                value={formData.links.github}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: '24px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1f2937',
                    borderRadius: '8px',
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4F46E5',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                  },
                }}
              />

              <TextField
                label="Live Demo Link"
                name="links.liveDemo"
                value={formData.links.liveDemo}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{
                  marginBottom: '24px',
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#1f2937',
                    borderRadius: '8px',
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4F46E5',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#2563EB',
                  },
                }}
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-6"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-xl shadow-md hover:bg-blue-600 transition-colors"
              >
                Submit Project
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProject;
