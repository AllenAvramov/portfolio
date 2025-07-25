import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MockupImage from './MockupForProj/MockupImage';

function ProjectCard({ project }) {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [avgRating, setAvgRating] = useState(Number(project.average_rating) || 0);
  const [count, setCount] = useState(Number(project.rating_count) || 0);

  useEffect(() => {
    const saved = localStorage.getItem(`rating-${project.id}`);
    if (saved) setRating(parseInt(saved, 10));
  }, [project.id]);

  // Handle a user rating click
  const handleRate = (r) => {
    setRating(r);
    localStorage.setItem(`rating-${project.id}`, r);

    axios.post('/api/ratings', { project_id: project.id, rating: r })
      .then(() => {
        const newCount = count + 1;
        const total = avgRating * count + r;
        const newAvg = total / newCount;
        setAvgRating(newAvg);
        setCount(newCount);
      })
      .catch(console.error);
  };

  const renderStars = (value, clickable = false, onClick) =>
    [1, 2, 3, 4, 5].map(n => (
      <i
        key={n}
        className={n <= (clickable ? value : Math.round(value))
          ? 'bi bi-star-fill text-warning'
          : 'bi bi-star'}
        style={{ cursor: clickable ? 'pointer' : 'default', fontSize: '1.2rem' }}
        onClick={clickable ? () => onClick(n) : undefined}
      />
    ));

  const formattedAvg = !isNaN(avgRating) ? avgRating.toFixed(1) : 'N/A';

  return (
    <div className="col hover-lift">
      <div className="card h-100 w-80 mx-auto project-card-style">
        <MockupImage projectImage={project.image} />
        <div className="card-body text-center">
          {/* Project Info */}
          <h5 className="card-title fw-bold">{project.title}</h5>
          <p className="card-text text-muted">{project.description}</p>
          {project.academic_track && <p><strong>Track:</strong> {project.academic_track}</p>}
          {project.technologies && (
            <div className="mb-3 d-flex flex-wrap gap-2 justify-content-center">
              {project.technologies.map((tech, i) => (
                <span key={i} className="badge bg-primary">{tech}</span>
              ))}
            </div>
          )}
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                <i className="bi bi-github me-1" /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                <i className="bi bi-box-arrow-up-right me-1" /> Live Demo
              </a>
            )}
            <button className="btn btn-outline-info" onClick={() => setShowModal(true)}>Read More</button>
          </div>

          <div className="d-flex gap-2 justify-content-center flex-wrap mt-2">
            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/project/${project.id}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-primary btn-sm"
            >
              <i className="bi bi-facebook me-1" /> Share
            </a>

            {/* LinkedIn */}
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.origin}/project/${project.id}&title=${project.title}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-info btn-sm"
            >
              <i className="bi bi-linkedin me-1" /> LinkedIn
            </a>

            {/* Twitter */}
            <a
              href={`https://twitter.com/intent/tweet?text=${project.title}&url=${window.location.origin}/project/${project.id}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline-dark btn-sm"
            >
              <i className="bi bi-twitter-x me-1" /> Tweet
            </a>

            {/* Copy Link */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/project/${project.id}`);
                alert('Link copied!');
              }}
              className="btn btn-outline-secondary btn-sm"
            >
              <i className="bi bi-clipboard me-1" /> Copy Link
            </button>
          </div>

          {/* Display average rating */}
          <div className="rating mt-3">
            {renderStars(avgRating)} <span>({count})</span>
          </div>
        </div>
      </div>

      {/* Modal with full info & interactive rating */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{project.title}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body">
                <p><strong>Description:</strong> {project.full_description || project.description}</p>
                {project.academic_track && <p><strong>Track:</strong> {project.academic_track}</p>}
                {project.students && <p><strong>Students:</strong> {project.students}</p>}
                {project.mentor && <p><strong>Mentor:</strong> {project.mentor}</p>}
                {project.technologies && <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>}
                {project.youtube_url && (
                  <p><strong>Youtube Video:</strong> <a href={project.youtube_url} target="_blank" rel="noreferrer">Watch</a></p>
                )}

                {/* Interactive rating */}
                <div className="my-3">
                  <strong>Rate this project:</strong>
                  <div className="d-flex gap-1 mt-1">
                    {renderStars(rating, true, handleRate)}
                  </div>
                  <small className="text-muted">Average: {formattedAvg} ({count} votes)</small>
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
