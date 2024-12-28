import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer/Footer';
import Search from '../../Component/Search';
import { Plus } from 'lucide-react';
import "./Home.css"
// Reusable GlowingOrb component from login page
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

const ProjectCard = ({ project }) => (
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
      
      <Link 
        to={`/projectDescription/${project._id}`}
        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
      >
        View Details
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
);

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        //https://project-hub-backend-seven.vercel.app/api/v1/
        const response = await fetch('https://project-hub-backend-seven.vercel.app/api/v1/');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [navigate]);

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-900">
      
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
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-3xl font-bold text-white"></h1>
          
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <div className="flex-grow sm:flex-grow-0 sm:w-64">
              <Search />
            </div>
            
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
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
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
    </>
  );
};

export default Home;