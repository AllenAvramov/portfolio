import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../Components/ProjectCard';

function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching projects...');
    axios.get('${process.env.REACT_APP_API_URL}/api/projects')
      .then(response => {
        console.log('Response received:', response.data);
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the data: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h1>My Portfolio</h1>
        <p>No projects found. Please add some projects to your portfolio.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">My Portfolio</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default PortfolioPage;
