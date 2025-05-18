import React from 'react';

const Terminal = ({ text }) => {
  const iconClass = "fa fa-circle";

  return (
    <section className="w-80 w-md-50 rounded mb-5 shadow-lg">
      <div className="bg-secondary p-2 rounded-top">
        <i className={`${iconClass} text-danger me-2`} />
        <i className={`${iconClass} text-warning me-2`} />
        <i className={`${iconClass} text-success`} />
      </div>
      <div className="bg-dark text-light p-3 p-md-4 rounded-bottom" style={{ fontSize: '1.3rem', fontFamily: 'Courier New, monospace' }}>
        {text}
      </div>
    </section>
  );
};

function AboutPage() {
  const firstName = "Tamar";
  const lastName = "&Allen";
  const baseColor = "#0d6efd";

  const bio = "Full Stack project that represents projects from GitHub.";
  const skills = {
    proficientWith: ["JavaScript", "React", "Node.js", "Express", "HTML", "CSS", "Git"],
    exposedTo: ["Bootstrap"]
  };

  const aboutMeText = (
    <>
      <p><span style={{ color: baseColor }}>{firstName}{lastName} $</span> cat about Tamar and Allen project</p>
      <p><span style={{ color: baseColor }}>about: <span className="text-success">(main)</span> $</span> {bio}</p>
    </>
  );

  const skillsText = (
    <>
      <p><span style={{ color: baseColor }}>{firstName}{lastName} $</span> cd skills/tools</p>
      <p><span style={{ color: baseColor }}>skills/tools <span className="text-success">(main)</span> $</span> ls</p>
      <p style={{ color: baseColor }}>Proficient With</p>
      <ul className="list-unstyled">
        {skills.proficientWith.map((skill, i) => <li key={i}>{skill}</li>)}
      </ul>
      <p style={{ color: baseColor }}>Exposed To</p>
      <ul className="list-unstyled">
        {skills.exposedTo.map((skill, i) => <li key={i}>{skill}</li>)}
      </ul>
    </>
  );

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <Terminal text={aboutMeText} />
      <Terminal text={skillsText} />
    </div>
  );
}

export default AboutPage;
