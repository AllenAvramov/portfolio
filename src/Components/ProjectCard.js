import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockupImage from './MockupForProj/MockupImage';

function ProjectCard({ project }) {
  const [showModal, setShowModal] = useState(false);

  const [rating, setRating] = useState(0); // user's current rating click
  const [avgRating, setAvgRating] = useState(0); // current average rating from server
  const [count, setCount] = useState(0); // total number of ratings

  // Fetch average rating and count from backend when project loads
  useEffect(() => {
    axios.get(`/api/ratings/${project.id}`)
      .then(res => {
        setAvgRating(res.data.average || 0);
        setCount(res.data.count || 0);
      })
      .catch(console.error);
  }, [project.id]);

  // User clicks a rating star
  const handleRate = (r) => {
    setRating(r); // visually update stars
    axios.post('/api/ratings', { project_id: project.id, rating: r })
      .then(() => axios.get(`/api/ratings/${project.id}`)) // refresh avg/count
      .then(res => {
        setAvgRating(res.data.average);
        setCount(res.data.count);
      })
      .catch(console.error);
  };

  // Render 5 stars, optionally clickable
  const renderStars = (current, clickable = false, onClick) =>
    [1, 2, 3, 4, 5].map(n => (
      <i
        key={n}
        className={
          n <= (clickable ? current : Math.round(current))
            ? 'bi bi-star-fill text-warning'
            : 'bi bi-star'
        }
        style={{ cursor: clickable ? 'pointer' : 'default', fontSize: '1.2rem' }}
        onClick={clickable ? () => onClick(n) : null}
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

          {/* Rating summary below card */}
          <div className="rating mt-3">
            {renderStars(avgRating)} <span>({count})</span>
          </div>
        </div>
      </div>

      {/* Modal for full project info and rating input */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{project.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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

                {/* Rating input section */}
                <div className="my-3">
                  <strong>Rate this project:</strong>
                  <div className="d-flex gap-1 mt-1">
                    {renderStars(rating, true, handleRate)}
                  </div>
                  <small className="text-muted">Average: {avgRating.toFixed(1)} ({count} votes)</small>
                </div>
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
