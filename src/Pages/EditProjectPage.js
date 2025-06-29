import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

console.log('EditProjectPage component loaded');

function EditProjectPage() {
  const { id } = useParams();      // id from URL id
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [allSkills, setAllSkills] = useState([]); // [{id,name}]
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const [projectRes, skillsRes] = await Promise.all([
          axios.get(`https://server-l1gu.onrender.com/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('https://server-l1gu.onrender.com/api/skills', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        const project = projectRes.data;
        console.log('Fetched project:', project);
        setTitle(project.title);
        setDescription(project.description);
        setImageUrl(project.image_url ?? '');
        setLiveUrl(project.live_url ?? '');
        setGithubUrl(project.github_url ?? '');
        setAllSkills(skillsRes.data);
        setSelectedSkills(project.technologies.map(t => t.name));
        console.log('Fetched skills:', skillsRes.data);
      } catch (err) {
        console.error('Error fetching project/skills:', err);
        alert('Cannot load project – check console.');
        // navigate('/admin/projects'); // comment out for debugging
      } finally {
        setLoading(false);
        console.log('Loading set to false');
      }
    })();
  }, [id, navigate]);

  console.log('EditProjectPage render', { loading });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const skillIds = allSkills
        .filter(s => selectedSkills.includes(s.name))
        .map(s => s.id);
      await axios.put(
        `https://server-l1gu.onrender.com/api/projects/${id}`,
        {
          title,
          description,
          image: imageUrl,
          live: liveUrl,
          github: githubUrl,
          technologies: skillIds
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Project updated!');
      navigate('/admin/projects');
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Update failed – see console.');
    }
  };

  const toggleSkill = (skillName) => {
    setSelectedSkills(prev =>
      prev.includes(skillName)
        ? prev.filter(s => s !== skillName)
        : [...prev, skillName]
    );
  };

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

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
            <h5 className="modal-title">Edit Project</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => navigate('/admin/projects')}></button>
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
                    <label className="form-check-label" htmlFor={`skill-${skill.id || idx}`}>{skill.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/projects')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProjectPage;
