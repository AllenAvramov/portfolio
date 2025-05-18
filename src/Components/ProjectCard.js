import React from 'react';
import MockupImage from './MockupForProj/MockupImage';

function ProjectCard({ project }) {
  return (
    <div className="col hover-lift">
    <div className="card h-100 w-80 mx-auto project-card-style">
        {project.image && (
          <MockupImage projectImage={project.image} />
        )}

        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{project.title}</h5>
          <p className="card-text text-muted">{project.description}</p>

          {project.technologies && (
            <div className="mb-3 d-flex justify-content-center flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="badge bg-primary">{tech}</span>
              ))}
            </div>
          )}

          <div className="d-flex justify-content-center gap-3">
            {project.github && (
              <a href={project.github} className="btn btn-outline-dark" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github me-1"></i> GitHub
              </a>
            )}

            {project.live && (
              <a href={project.live} className="btn btn-outline-primary" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
