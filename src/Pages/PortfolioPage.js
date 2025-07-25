import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../Components/ProjectCard';

function PortfolioPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); //for searching prohect by names
  const [selectedTech, setSelectedTech] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false); //for filter according to technologies
  const [selectedTrack, setSelectedTrack] = useState(''); //filter according to acdamic track
  const [showTrackMenu, setShowTrackMenu] = useState(false);

  useEffect(() => {
    console.log('Fetching projects...');
    axios.get('https://server-l1gu.onrender.com/api/projects')
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

  //acdamic track list
  const allTracks = Array.from(new Set(projects.map(p => p.academic_track).filter(Boolean)));

    // extract unique technologies
  const allTechnologies = Array.from(new Set(
    projects.flatMap(p => p.technologies || [])
  ));

    //search projects, words and filter
const filteredProjects = projects.filter(project => {
  const lowerSearch = searchTerm.toLowerCase();

  const matchesTitle = project.title?.toLowerCase().includes(lowerSearch);
  const matchesDescription = project.description?.toLowerCase().includes(lowerSearch);
  const matchesTechnologies = (project.technologies || [])
    .some(tech => tech.toLowerCase().includes(lowerSearch));
  const matchesTrack = project.academic_track?.toLowerCase().includes(lowerSearch);

  return (
    (matchesTitle || matchesDescription || matchesTechnologies || matchesTrack) &&
    (selectedTech === '' || (project.technologies || []).includes(selectedTech)) &&
    (selectedTrack === '' || project.academic_track === selectedTrack)
  );
});



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
      <h1 className="text-center mb-4">My Portfolio</h1>

      <div className="d-flex flex-column flex-md-row gap-3 align-items-stretch mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search project"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="position-relative">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => setShowFilterMenu(prev => !prev)}
          >
            {selectedTech ? `Filtered by: ${selectedTech}` : "Filter by Technology"}
          </button>

          {showFilterMenu && (
            <ul
              className="list-group position-absolute z-3 bg-white shadow"
              style={{ maxHeight: '200px', overflowY: 'auto', width: '100%' }}
            >
              {allTechnologies.map((tech, i) => (
                <li
                  key={i}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    setSelectedTech(tech);
                    setShowFilterMenu(false);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {tech}
                </li>
              ))}
              <li
                className="list-group-item list-group-item-action text-danger"
                onClick={() => {
                  setSelectedTech('');
                  setShowFilterMenu(false);
                }}
                style={{ cursor: 'pointer' }}
              >
                Clear Filter
              </li>
            </ul>
          )}
        </div>

 {/* Filter by Academic Track */}
  <div className="position-relative">
    <button
      className="btn btn-outline-secondary w-100"
      onClick={() => setShowTrackMenu(prev => !prev)}
    >
      {selectedTrack ? `Filtered by: ${selectedTrack}` : "Filter by Track"}
    </button>

    {showTrackMenu && (
      <ul
        className="list-group position-absolute z-3 bg-white shadow"
        style={{ maxHeight: '200px', overflowY: 'auto', width: '100%' }}
      >
        {allTracks.map((track, i) => (
          <li
            key={i}
            className="list-group-item list-group-item-action"
            onClick={() => {
              setSelectedTrack(track);
              setShowTrackMenu(false);
            }}
            style={{ cursor: 'pointer' }}
          >
            {track}
          </li>
        ))}
        <li
          className="list-group-item list-group-item-action text-danger"
          onClick={() => {
            setSelectedTrack('');
            setShowTrackMenu(false);
          }}
          style={{ cursor: 'pointer' }}
        >
          Clear Filter
        </li>
      </ul>
    )}
  </div>
      </div>
      {filteredProjects.length === 0 ? (
        <p className="text-center text-muted">No matching projects found.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PortfolioPage;