import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProjectPage({ show, onClose, onProjectAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [full_description, setFullDescription] = useState('');
  const [academic_track, setAcademicTrack] = useState('');
  const [students, setStudents] = useState('');
  const [mentor, setMentor] = useState('');
  const [youtube_url, setYoutubeUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('web');
  const [addingSkill, setAddingSkill] = useState(false);

  //here how to add a new project to our portofilo project
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

  const addNewSkill = async () => {
    const trimmed = newSkill.trim();
    if (!trimmed || allSkills.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) return;

    try {
      const res = await axios.post('https://server-l1gu.onrender.com/api/skills', {
        name: trimmed,
        category: newCategory
      });

      const savedSkill = res.data;
      setAllSkills(prev => [...prev, savedSkill]);
      setSelectedSkills(prev => [...prev, savedSkill.name]);
      setNewSkill('');
      setNewCategory('web');
      setAddingSkill(false);
    } catch (err) {
      console.error('Failed to add skill to server', err);
      alert('Failed to add skill to database');
    }
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
        full_description,
        academic_track,
        students,
        mentor,
        youtube_url,
        image: imageUrl,
        live: liveUrl,
        github: githubUrl,
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
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0, left: 0, width: '100vw', height: '100vh',
      zIndex: 1050,
      padding: '2rem'
    }}>
      <div className="modal-dialog" style={{
        maxWidth: 600,
        width: '100%'
      }}>
        <div className="modal-content" style={{
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div className="modal-header">
            <h5 className="modal-title">Add New Project</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input className="form-control mb-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <textarea className="form-control mb-2" placeholder="Short Description" value={description} onChange={e => setDescription(e.target.value)} required />
              <textarea className="form-control mb-2" placeholder="Full Description" value={full_description} onChange={e => setFullDescription(e.target.value)} />
              <input className="form-control mb-2" placeholder="Academic Track" value={academic_track} onChange={e => setAcademicTrack(e.target.value)} />
              <input className="form-control mb-2" placeholder="Students" value={students} onChange={e => setStudents(e.target.value)} />
              <input className="form-control mb-2" placeholder="Mentor" value={mentor} onChange={e => setMentor(e.target.value)} />
              <input className="form-control mb-2" placeholder="YouTube URL" value={youtube_url} onChange={e => setYoutubeUrl(e.target.value)} />
              <input className="form-control mb-2" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
              <input className="form-control mb-2" placeholder="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
              <input className="form-control mb-2" placeholder="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />

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

              <div className="mb-3 mt-2 w-100">
                {addingSkill ? (
                  <div className="d-flex flex-column gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="New Technology Name"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <select
                      className="form-select"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      <option value="web">Web</option>
                      <option value="programming">Programming</option>
                      <option value="database">Database</option>
                    </select>
                    <div className="d-flex gap-2">
                      <button className="btn btn-success w-100" type="button" onClick={addNewSkill}>
                        Add
                      </button>
                      <button className="btn btn-outline-secondary w-100" type="button" onClick={() => setAddingSkill(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="btn btn-sm btn-outline-primary" type="button" onClick={() => setAddingSkill(true)}>
                    + Add New Technology
                  </button>
                )}
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
