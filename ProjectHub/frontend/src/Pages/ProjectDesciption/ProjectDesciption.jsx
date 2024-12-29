import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Component/Navbar';
import Footer from '../../Component/Footer/Footer';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Github, Globe, Code2 } from 'lucide-react';

// Keep existing GlowingOrb component
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

const ProjectLink = ({ href, icon: Icon, label }) => (
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-gray-300 hover:text-white group"
    >
      <Icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-400" />
      <span className="flex-grow">{label}</span>
      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  ) : null
);

const ProjectDescription = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://project-hub-backend-seven.vercel.app/api/v1/');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects);
        
        // Find the selected project using MongoDB's ObjectId
        const project = data.projects.find(p => p._id === id);
        if (project) {
          setSelectedProject(project);
        } else {
          navigate('/home');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        navigate('/home');
      }
    };

    fetchProjects();
  }, [id, navigate]);

  if (!selectedProject) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

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
          
          {/* Back Button */}
          <Link
            to="/home"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 mb-8">
            <div className="relative h-96">
              <img
                src={selectedProject.image?.length > 0 ? selectedProject.image[0] : '/api/placeholder/400/320'}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{selectedProject.title}</h1>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(selectedProject.dateCreated).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <User className="w-4 h-4 mr-2" />
                    {selectedProject.creator || 'Anonymous'}
                  </div>
                  {selectedProject.category && (
                    <div className="flex items-center text-gray-300">
                      <Tag className="w-4 h-4 mr-2" />
                      {selectedProject.category.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4">Project Description</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{selectedProject.description}</p>
              </div>

              {/* Tech Stack */}
              {selectedProject.technologies && selectedProject.technologies.length > 0 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                  <h2 className="text-2xl font-semibold text-white mb-4">Tech Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Images Gallery */}
              {selectedProject.image && selectedProject.image.length > 1 && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                  <h2 className="text-2xl font-semibold text-white mb-4">Project Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProject.image.map((img, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Links */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4">Project Links</h2>
                <div className="space-y-3">
                  {selectedProject.links?.github && (
                    <ProjectLink 
                      href={selectedProject.links.github}
                      icon={Github}
                      label="GitHub Repository"
                    />
                  )}
                  {selectedProject.links?.liveDemo && (
                    <ProjectLink 
                      href={selectedProject.links.liveDemo}
                      icon={Globe}
                      label="Live Demo"
                    />
                  )}
                  {selectedProject.links?.sourceCode && (
                    <ProjectLink 
                      href={selectedProject.links.sourceCode}
                      icon={Code2}
                      label="Source Code"
                    />
                  )}
                  {selectedProject.links?.other && (
                    <ProjectLink 
                      href={selectedProject.links.other}
                      icon={ExternalLink}
                      label="Other Link"
                    />
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <h2 className="text-2xl font-semibold text-white mb-4">Project Details</h2>
                <div className="space-y-4">
                  {selectedProject.rating && (
                    <div>
                      <h3 className="text-gray-400 text-sm">Rating</h3>
                      <p className="text-white">{selectedProject.rating} / 5</p>
                    </div>
                  )}
                  {selectedProject.category && (
                    <div>
                      <h3 className="text-gray-400 text-sm">Category</h3>
                      <p className="text-white">{selectedProject.category.join(', ')}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-gray-400 text-sm">Created Date</h3>
                    <p className="text-white">
                      {new Date(selectedProject.dateCreated).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-gray-400 text-sm">Last Updated</h3>
                    <p className="text-white">
                      {new Date(selectedProject.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedProject.collaborators && selectedProject.collaborators.length > 0 && (
                    <div>
                      <h3 className="text-gray-400 text-sm">Collaborators</h3>
                      <p className="text-white">{selectedProject.collaborators.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectDescription;