import React from 'react';

function ProjectCard({ project }) {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        {project.image && (
          <img
            src={project.image}
            className="card-img-top"
            alt={project.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{project.title}</h5>
          <p className="card-text">{project.description}</p>
          {project.technologies && (
            <div className="mb-3">
              {project.technologies.map((tech, index) => (
                <span key={index} className="badge bg-primary me-1">{tech}</span>
              ))}
            </div>
          )}
          {project.github && (
            <a href={project.github} className="btn btn-outline-dark me-2" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-github"></i> GitHub
            </a>
          )}
          {project.live && (
            <a href={project.live} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;