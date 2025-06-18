// src/Pages/AddProjectPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProjectPage.css';

function AddProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://server-l1gu.onrender.com/api/skills')
      .then(res => setAllSkills(res.data))
      .catch(err => console.error('Error loading skills', err));
  }, []);

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
      const skillsRes = await axios.get('https://server-l1gu.onrender.com/api/skills');
      const skillIds = skillsRes.data
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
      navigate('/admin/projects');
    } catch (err) {
      console.error('Error adding project', err);
      alert('Failed to add project');
    }
  };

  return (
    <div className="add-project container py-5">
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
        <input type="text" placeholder="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
        <input type="text" placeholder="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />

        <h4>Technologies:</h4>
        <div className="skills-list">
          {allSkills.map(skill => (
            <label key={skill.name}>
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.name)}
                onChange={() => toggleSkill(skill.name)}
              />
              {skill.name}
            </label>
          ))}
        </div>

        <button type="submit">Add Project</button>
      </form>
    </div>
  );
}

export default AddProjectPage;
