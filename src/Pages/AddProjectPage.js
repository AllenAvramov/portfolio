import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProjectPage({ show, onClose, onProjectAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (show) {
      axios.get('https://server-l1gu.onrender.com/api/skills')
        .then(res => setAllSkills(res.data))
        .catch(err => console.error('Error loading skills', err));
    }
  }, [show]);

  const toggleSkill = (skillName) => {
    setSelectedSkills(prev =>
      prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const skillIds = allSkills
        .filter(s => selectedSkills.includes(s.name))
        .map(s => s.id);

      await axios.post('https://server-l1gu.onrender.com/api/projects', {
        title,
        description,
        image_url: imageUrl,
        live_url: liveUrl,
        github_url: githubUrl,
        technologies: skillIds
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Project added!');
      onProjectAdded();
      onClose();
    } catch (err) {
      console.error('Error adding project', err);
      alert('Failed to add project');
    }
  };

  if (!show) return null;

  return (
    <div className="modal show fade" tabIndex="-1" style={{
      display: 'flex',
      background: 'rgba(0,0,0,0.8)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      zIndex: 1050
    }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 500 }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Project</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input type="text" className="form-control mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <textarea className="form-control mb-2" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
              <input type="text" className="form-control mb-2" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
              <input type="text" className="form-control mb-2" placeholder="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
              <input type="text" className="form-control mb-2" placeholder="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />

              <h6 className="mt-3">Technologies:</h6>
              <div className="d-flex flex-wrap gap-2 mb-2" style={{ maxHeight: 200, overflowY: 'auto' }}>
                {allSkills.map((skill, idx) => (
                  <div className="form-check" key={skill.id || idx}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedSkills.includes(skill.name)}
                      onChange={() => toggleSkill(skill.name)}
                      id={`skill-${skill.id || idx}`}
                    />
                    <label className="form-check-label" htmlFor={`skill-${skill.id || idx}`}>
                      {skill.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Add</button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectPage;
