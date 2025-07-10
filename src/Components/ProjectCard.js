import React, { useState } from 'react';
import MockupImage from './MockupForProj/MockupImage';

function ProjectCard({ project }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="col hover-lift">
      <div className="card h-100 w-80 mx-auto project-card-style">
        <MockupImage projectImage={project.image} />

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

          <div className="d-flex justify-content-center gap-2 flex-wrap">
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
            <button className="btn btn-outline-info" onClick={() => setShowModal(true)}>
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{project.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
             <div className="modal-body text-start">
  <p><strong>Description:</strong> {project.fullDescription}</p>

  {project.academic_track && (
    <p><strong>Academic Track:</strong> {project.academic_track}</p>
  )}

 {project.students && (
  <p><strong>Students:</strong> {project.students}</p>
)}

  {project.mentor && (
    <p><strong>Mentor:</strong> {project.mentor}</p>
  )}

  {project.technologies && (
    <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
  )}

  {project.media?.youtube && (
    <p><strong>Demo Video:</strong> <a href={project.media.youtube} target="_blank" rel="noreferrer">Watch</a></p>
  )}
</div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
