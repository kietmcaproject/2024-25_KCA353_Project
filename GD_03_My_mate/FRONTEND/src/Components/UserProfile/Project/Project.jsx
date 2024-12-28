import React from 'react';

const Project = ({ projects }) => {
  return (
    <div className="projects">
      <h2>Project</h2>
      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project._id} className="project">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))
      ) : (
        <p>No projects available.</p>
      )}
    </div>
  );
};

export default Project;
