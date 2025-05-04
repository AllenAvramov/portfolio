import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PortfolioPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching the data: ', error);
      });
  }, []);

  return (
    <div>
      <h1>Portfolio</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PortfolioPage;
