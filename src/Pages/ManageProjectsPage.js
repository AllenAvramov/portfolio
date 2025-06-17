import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProjectsPage.css';

function ManageProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const token = localStorage.getItem('token');
    const res = await fetch('https://server-l1gu.onrender.com/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

const deleteProject = async (id) => {
  const token = localStorage.getItem('token');
  if (!window.confirm('Are you sure you want to delete this project?')) return;
  await fetch(`https://server-l1gu.onrender.com/api/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  fetchProjects();
};


  return (
    <div className="projects-page container py-5">
      <button className="back-btn" onClick={() => navigate('/admin')}>← Back to Admin</button>
      <h2>Manage Projects</h2>
      <button className="add-btn" onClick={() => navigate('/admin/projects/new')}>Add New Project</button>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length ? (
        <ul className="projects-list">
          {projects.map(p => (
            <li key={p.id} className="project-item">
              <div>
                <h3>{p.title}</h3>
                <p className="desc">{p.description}</p>
              </div>
              <div className="actions">
                <button onClick={() => navigate(`/admin/projects/edit/${p.id}`)}>Edit</button>
                <button className="delete" onClick={() => deleteProject(p.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No projects found.</div>
      )}
    </div>
  )
}

export default ManageProjectsPage;
