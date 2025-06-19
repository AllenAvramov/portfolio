import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddProjectPage.css'; 

function EditProjectPage() {
  const { id } = useParams();      // id from URL id
  const navigate = useNavigate();

  const [title,        setTitle]        = useState('');
  const [description,  setDescription]  = useState('');
  const [imageUrl,     setImageUrl]     = useState('');
  const [liveUrl,      setLiveUrl]      = useState('');
  const [githubUrl,    setGithubUrl]    = useState('');
  const [allSkills,    setAllSkills]    = useState([]); // [{id,name}]
  const [selectedIds,  setSelectedIds]  = useState([]); 
  const [loading,      setLoading]      = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const [projectRes, skillsRes] = await Promise.all([
          axios.get(`https://server-l1gu.onrender.com/api/projects/${id}`),
          axios.get('https://server-l1gu.onrender.com/api/skills')
        ]);

        const project = projectRes.data;
        setTitle(project.title);
        setDescription(project.description);
        setImageUrl(project.image_url ?? '');
        setLiveUrl(project.live_url ?? '');
        setGithubUrl(project.github_url ?? '');
        // technologies is array of {id,name}
        setSelectedIds(project.technologies.map(t => t.id));

        setAllSkills(skillsRes.data);       // full list for checkboxes
      } catch (err) {
        console.error('Error fetching project/skills:', err);
        alert('Cannot load project – check console.');
        navigate('/admin/projects');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  //toggle checkbox
  const toggleSkill = (skillId) => {
    setSelectedIds(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId)
                             : [...prev, skillId]
    );
  };

  //submit
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
          live_url:  liveUrl,
          github_url: githubUrl,
          technologies: selectedIds          // send IDs only
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

  if (loading) return <div className="container py-5">Loading...</div>;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Project</h3>

        <form onSubmit={handleSubmit}>
          {/* basic fields */}
          <input   value={title}       onChange={e=>setTitle(e.target.value)}       placeholder="Title" required />
          <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" required />
          <input   value={imageUrl}    onChange={e=>setImageUrl(e.target.value)}    placeholder="Image URL" />
          <input   value={liveUrl}     onChange={e=>setLiveUrl(e.target.value)}     placeholder="Live URL" />
          <input   value={githubUrl}   onChange={e=>setGithubUrl(e.target.value)}   placeholder="GitHub URL" />

          <h4>Technologies</h4>
          <div className="skills-list">
            {allSkills.map(skill => (
              <label key={skill.id}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(skill.id)}
                  onChange={() => toggleSkill(skill.id)}
                />{' '}
                {skill.name}
              </label>
            ))}
          </div>

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => navigate('/admin/projects')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProjectPage;
