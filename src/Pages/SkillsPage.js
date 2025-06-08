import React, { useState, useEffect } from 'react';
import './SkillsPage.css';
import Terminal from '../Components/Terminal/Terminal.js';
import axios from 'axios';

function SkillsPage() {
  const [skills, setSkills] = useState({
    programming: [],
    web: [],
    database: [],
    tools: []
  });

  useEffect(() => {
    axios.get('/api/skills')
      .then(res => {
        const grouped = {
          programming: [],
          web: [],
          database: [],
          tools: []
        };
        res.data.forEach(skill => {
          if (grouped[skill.category]) {
            grouped[skill.category].push(skill.name);
          }
        });
        setSkills(grouped);
      })
      .catch(err => console.error('Failed to load skills', err));
  }, []);

  const skillsText = (
    <div className="terminal-text">
      <p className="command-line">
        <span className="prompt">Tamar&Allen</span>
        <span className="command">$</span> cd skills
      </p>
      <p className="command-line">
        <span className="prompt">skills</span>
        <span className="branch">(main)</span>
        <span className="command">$</span> ls
      </p>

      <div className="skills-section">
        <h3 className="section-title">Programming Languages</h3>
        <div className="skills-grid">
          {skills.programming.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-code"></i> {skill}
            </div>
          ))}
        </div>

        <h3 className="section-title">Web Development</h3>
        <div className="skills-grid">
          {skills.web.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-globe"></i> {skill}
            </div>
          ))}
        </div>

        <h3 className="section-title">Databases</h3>
        <div className="skills-grid">
          {skills.database.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-database"></i> {skill}
            </div>
          ))}
        </div>

        <h3 className="section-title">Tools & Technologies</h3>
        <div className="skills-grid">
          {skills.tools.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-tools"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="skills-page">
      <div className="skills-container">
        <h1 className="page-title">Our Skills</h1>
        <div className="terminals-wrapper">
          <Terminal text={skillsText} title="Skills" />
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;
