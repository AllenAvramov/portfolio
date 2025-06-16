import React, { useEffect, useState } from 'react';
import './AboutPage.css';
import Terminal from '../Components/Terminal/Terminal.js';
import axios from 'axios';

function AboutPage() {
  const firstName = "Tamar";
  const lastName = "&Allen";

  const bio = `This is a modern personal portfolio website built using React.js. Here are the key features and technical details:

Architecture:
- Built with React.js using Create React App
- Uses React Router for navigation
- Implements a client-server architecture with a proxy to localhost:4000

Main Pages:
- Home/Portfolio Page (/)
- Admin Page (/admin)
- About Page (/about)
- Contact Page (/contact)
- Skills Page (/skills)

UI/UX Features:
- Modern UI with Bootstrap 5.3.6 for responsive design
- Enhanced with Bootstrap Icons and Font Awesome for icons
- Uses Framer Motion for smooth animations
- Custom navigation bar component

Technical Stack:
- Frontend Framework: React 19.1.0
- Routing: React Router DOM 7.5.3
- Styling: Bootstrap 5.3.6
- HTTP Client: Axios for API calls
- Testing: Jest and React Testing Library

Development Features:
- Development server with hot reloading
- Production build optimization
- Testing setup with Jest
- ESLint configuration for code quality
- Browser compatibility configuration

The project appears to be a professional portfolio website that showcases the developer's work, skills, and provides contact information. It's built with modern web technologies and follows best practices for React development. The inclusion of an admin page suggests there might be some content management functionality, and the proxy configuration indicates it's designed to work with a backend server running on port 4000.

The project uses a clean, component-based architecture and implements modern web development practices, making it maintainable and scalable. The use of Bootstrap and other UI libraries ensures a professional and responsive design across different devices.`;

  const [proficientWith, setProficientWith] = useState([]);
  const [exposedTo, setExposedTo] = useState([]);

  useEffect(() => {
    axios.get('https://server-l1gu.onrender.com/api/about-skills')
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
