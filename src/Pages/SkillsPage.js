import React from 'react';
import './SkillsPage.css';
import Terminal from '../Components/Terminal/Terminal.js';



function SkillsPage() {
  const skills = {
    programming: ["C++", "C", "C#", "Python", "JavaScript", "TypeScript", "Java", "Bash", "Assembly"],
    webDevelopment: ["Angular","React.js", "Node.js", "Express.js", "HTML", "CSS", "Bootstrap", "Tailwind", ".NET"],
    databases: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
    tools: ["Git", "Linux", "Docker", "VS Code", "Android Studio"]
  };

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
              <i className="fas fa-code"></i>
              {skill}
            </div>
          ))}
        </div>

        <h3 className="section-title">Web Development</h3>
        <div className="skills-grid">
          {skills.webDevelopment.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-globe"></i>
              {skill}
            </div>
          ))}
        </div>

        <h3 className="section-title">Databases</h3>
        <div className="skills-grid">
          {skills.databases.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-database"></i>
              {skill}
            </div>
          ))}
        </div>

        <h3 className="section-title">Tools & Technologies</h3>
        <div className="skills-grid">
          {skills.tools.map((skill, i) => (
            <div key={i} className="skill-item">
              <i className="fas fa-tools"></i>
              {skill}
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
