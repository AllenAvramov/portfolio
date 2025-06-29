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
  const [selectedIds, setSelectedIds] = useState([]);
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
        setSelectedIds(project.technologies.map(t => t.id));
        setAllSkills(skillsRes.data);
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
      await axios.put(
        `https://server-l1gu.onrender.com/api/projects/${id}`,
        {
          title,
          description,
          image_url: imageUrl,
          live_url: liveUrl,
          github_url: githubUrl,
          technologies: selectedIds
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

  const toggleSkill = (skillId) => {
    setSelectedIds(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId)
        : [...prev, skillId]
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
                      checked={selectedIds.includes(skill.id)}
                      onChange={() => toggleSkill(skill.id)}
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
