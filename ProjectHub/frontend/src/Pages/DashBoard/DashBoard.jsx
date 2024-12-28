import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer/Footer';
import { Plus, Edit, Trash2 } from 'lucide-react';

// Reusable GlowingOrb component
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

const ProjectCard = ({ project, onEdit, onDelete }) => (
  <div className="relative group bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.image.length > 0 ? project.image[0] : '/api/placeholder/400/320'}
        alt={project.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(project._id)}
          className="inline-flex items-center px-3 py-2 text-sm bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          onClick={() => onDelete(project._id)}
          className="inline-flex items-center px-3 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </div>
  </div>
);

const DashBoard = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  const decodeJWT = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  };

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://project-hub-backend-seven.vercel.app/api/v1/');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        const projectsData = data.projects || data;

        const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = decodeJWT(token);
          const userId = decodedToken.id;
          const userProjects = Array.isArray(projectsData) ? 
            projectsData.filter(project => project.creator === userId) : [];
          setProjects(userProjects);
        } else {
          setError('User not logged in');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    navigate(`/projects/${projectId}/edit`);
  };

  const handleDelete = async (projectId) => {
    try {
      //https://project-hub-backend-seven.vercel.app/api/v1/
      const response = await fetch(`https://project-hub-backend-seven.vercel.app/api/v1/projects/${projectId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      setProjects(projects.filter(project => project._id !== projectId));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed top-64 inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <GlowingOrb color1="#4F46E5" color2="#2563EB" delay={0} />
        <GlowingOrb color1="#7C3AED" color2="#4F46E5" delay={2} />
        <GlowingOrb color1="#2563EB" color2="#3B82F6" delay={4} />
      </div>

      {/* Main Content */}
      <main className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-1000
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          
          <Link
            to="/add-project"
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
              text-white rounded-lg font-medium transform hover:scale-[1.02] transition-all duration-200
              hover:shadow-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500
              focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Project
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-2">No Projects Found</h3>
                <p className="text-gray-400 mb-4">Start by creating your first project!</p>
                <Link
                  to="/add-project"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg
                    hover:bg-blue-600 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Project
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DashBoard;