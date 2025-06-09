import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import Terminal from '../Components/Terminal/Terminal.js';
import axios from 'axios';

function AboutPage() {
  const firstName = "Tamar";
  const lastName = "&Allen";

  const bio = "Full Stack project that represents projects from GitHub.";

  const [proficientWith, setProficientWith] = useState([]);
  const [exposedTo, setExposedTo] = useState([]);

  useEffect(() => {
    axios.get('/api/about-skills')
      .then(res => {
        const proficient = res.data.filter(skill => skill.type === 'proficient').map(skill => skill.name);
        const exposed = res.data.filter(skill => skill.type === 'exposed').map(skill => skill.name);
        setProficientWith(proficient);
        setExposedTo(exposed);
      })
      .catch(err => {
        console.error('Failed to load about skills', err);
      });
  }, []);

  const aboutMeText = (
    <div className="terminal-text">
      <p className="command-line">
        <span className="prompt">{firstName}{lastName}</span>
        <span className="command">$</span> cat about.txt
      </p>
      <p className="command-line">
        <span className="prompt">about</span>
        <span className="branch">(main)</span>
        <span className="command">$</span> {bio}
      </p>
    </div>
  );

  const skillsText = (
    <div className="terminal-text">
      <p className="command-line">
        <span className="prompt">{firstName}{lastName}</span>
        <span className="command">$</span> cd skills/tools
      </p>
      <p className="command-line">
        <span className="prompt">skills/tools</span>
        <span className="branch">(main)</span>
        <span className="command">$</span> ls
      </p>
      <div className="skills-section">
        <h3 className="section-title">Proficient With</h3>
        <div className="skills-grid">
          {proficientWith.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-check-circle"></i> {skill}
            </div>
          ))}
        </div>
        <h3 className="section-title">Exposed To</h3>
        <div className="skills-grid">
          {exposedTo.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-star"></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="page-title">About Us</h1>
        <div className="terminals-wrapper">
          <Terminal text={aboutMeText} title="About" />
          <Terminal text={skillsText} title="Skills" />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
