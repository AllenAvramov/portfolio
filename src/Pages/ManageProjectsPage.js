import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageProjectsPage.css';
import axios from 'axios';
import AddProjectModal from '../Components/AddProjectModal';

function ManageProjectsPage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://server-l1gu.onrender.com/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  }

  const deleteProject = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`https://server-l1gu.onrender.com/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchProjects(); // refresh the list after deletion
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  return (
    <div className="projects-page container py-5">
      <AddProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onProjectAdded={fetchProjects}
      />

      <button className="back-btn" onClick={() => navigate('/admin')}>← Back to Admin</button>
      <h2>Manage Projects</h2>
      
      <button className="add-btn" onClick={() => setShowModal(true)}>Add New Project</button>

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
  );
}

export default ManageProjectsPage;
