import React from 'react';
import './SkillsPage.css';

const skills = [
  "C++", "C", "Python", "JavaScript", "Linux", "Java", "React", "Assembly"
];

function SkillsPage() {
  return (
    <div className="skills-page container py-5">
      <h2 className="text-center mb-4">Our Skills</h2>
      <div className="terminal-box shadow-lg p-4">
        <div className="terminal-header p-2 mb-3">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <p className="text-light mb-3"><span className="prompt">Tamar&Allen $</span> cd skills</p>
        <p className="text-light mb-3"><span className="prompt">skills (main) $</span> ls</p>
        <div className="skills-list">
          {skills.map((skill, i) => (
            <span className="badge bg-gradient-primary text-white skill-badge" key={i}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillsPage;
