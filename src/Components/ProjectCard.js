import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockupImage from './MockupForProj/MockupImage';

function ProjectCard({ project }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0); // local rating value
  const [avgRating, setAvgRating] = useState(project.average_rating || 0);
  const [count, setCount] = useState(project.rating_count || 0);

  // Load rating from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(`rating-${project.id}`);
    if (saved) {
      setRating(parseInt(saved));
    }
  }, [project.id]);

  // Handle rating click
  const handleRate = (r) => {
    setRating(r);
    localStorage.setItem(`rating-${project.id}`, r);

    axios.post('/api/ratings', { project_id: project.id, rating: r })
      .then(() => {
        // Update rating locally instead of refetching
        const newCount = count + 1;
        const newAvg = ((avgRating * count) + r) / newCount;
        setAvgRating(parseFloat(newAvg.toFixed(1)));
        setCount(newCount);
      })
      .catch(console.error);
  };

  // Render stars (optionally clickable)
  const renderStars = (value, clickable = false, onClick) =>
    [1, 2, 3, 4, 5].map(n => (
      <i
        key={n}
        className={
          n <= (clickable ? value : Math.round(value))
            ? 'bi bi-star-fill text-warning'
            : 'bi bi-star'
        }
        style={{ cursor: clickable ? 'pointer' : 'default', fontSize: '1.2rem' }}
        onClick={clickable ? () => onClick(n) : undefined}
      />
    ));

  return (
    <div className="col hover-lift">
      <div className="card h-100 w-80 mx-auto project-card-style">
        <MockupImage projectImage={project.image} />
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{project.title}</h5>
          <p className="card-text text-muted">{project.description}</p>

          {project.academic_track && (
            <p className="text-muted mb-2"><strong>Track:</strong> {project.academic_track}</p>
          )}

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

          {/* Static average rating display */}
          <div className="rating mt-3">
            {renderStars(avgRating)} <span>({count})</span>
          </div>
        </div>
      </div>

      {/* Modal with full project info + interactive rating */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{project.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body text-start">
                <p><strong>Description:</strong> {project.full_description || project.description}</p>

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
                {project.youtube_url && (
                  <p><strong>Youtube Video:</strong> <a href={project.youtube_url} target="_blank" rel="noreferrer">Watch</a></p>
                )}

                {/* Rating block */}
                <div className="my-3">
                  <strong>Rate this project:</strong>
                  <div className="d-flex gap-1 mt-1">
                    {renderStars(rating, true, handleRate)}
                  </div>
                  <small className="text-muted">
                    Average: {isNaN(avgRating) ? 'N/A' : avgRating.toFixed(1)} ({count} votes)
                  </small>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
