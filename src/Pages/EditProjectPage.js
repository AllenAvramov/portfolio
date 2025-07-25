import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [academicTrack, setAcademicTrack] = useState('');
  const [students, setStudents] = useState('');
  const [mentor, setMentor] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  //this is how to edit excist project in the portofilo
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const [pRes, sRes] = await Promise.all([
          axios.get(`https://server-l1gu.onrender.com/api/projects/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('https://server-l1gu.onrender.com/api/skills', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const proj = pRes.data;
        setTitle(proj.title);
        setDescription(proj.description);
        setFullDescription(proj.full_description || '');
        setAcademicTrack(proj.academic_track || '');
        setStudents(proj.students || '');
        setMentor(proj.mentor || '');
        setYoutubeUrl(proj.youtube_url || '');
        setImageUrl(proj.image || '');
        setLiveUrl(proj.live || '');
        setGithubUrl(proj.github || '');
        setAllSkills(sRes.data);
        setSelectedSkills(proj.technologies?.map(t => t.name) || []);
      } catch (err) {
        console.error(err);
        alert('Failed to load project data');
        navigate('/admin/projects');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, navigate]);

  const toggleSkill = name => {
    setSelectedSkills(prev =>
      prev.includes(name)
        ? prev.filter(s => s !== name)
        : [...prev, name]
    );
  };

  const onSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const techIds = allSkills
        .filter(s => selectedSkills.includes(s.name))
        .map(s => s.id);
      await axios.put(
        `https://server-l1gu.onrender.com/api/projects/${id}`,
        {
          title,
          description,
          full_description: fullDescription,
          academic_track: academicTrack,
          students,
          mentor,
          youtube_url: youtubeUrl,
          image: imageUrl,
          live: liveUrl,
          github: githubUrl,
          technologies: techIds,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Project updated!');
      navigate('/admin/projects');
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  if (loading) return <div>Loading…</div>;

  return (
    <div className="modal show fade" tabIndex="-1" style={{
      display: 'flex', background: 'rgba(0,0,0,0.8)',
      alignItems: 'center', justifyContent: 'center',
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh', zIndex: 1050
    }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 600, width: '100%' }}>
        <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <div className="modal-header">
            <h5 className="modal-title">Edit Project</h5>
            <button type="button" className="btn-close" onClick={() => navigate('/admin/projects')} />
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              {/* Basic Fields */}
              <input className="form-control mb-2" value={title} onChange={e => setTitle(e.target.value)} required />
              <textarea className="form-control mb-2" value={description} onChange={e => setDescription(e.target.value)} required />
              <textarea className="form-control mb-2" placeholder="Full Description"
                value={fullDescription}
                onChange={e => setFullDescription(e.target.value)}
              />
              {/* New Fields */}
              <input className="form-control mb-2" placeholder="Academic Track" value={academicTrack} onChange={e => setAcademicTrack(e.target.value)} />
              <input className="form-control mb-2" placeholder="Students" value={students} onChange={e => setStudents(e.target.value)} />
              <input className="form-control mb-2" placeholder="Mentor" value={mentor} onChange={e => setMentor(e.target.value)} />
              <input className="form-control mb-2" placeholder="YouTube URL" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
              {/* Existing */}
              <input className="form-control mb-2" placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
              <input className="form-control mb-2" placeholder="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} />
              <input className="form-control mb-2" placeholder="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} />
              {/* Technologies */}
              <h6>Technologies</h6>
              <div className="d-flex flex-wrap gap-2 mb-2" style={{ maxHeight: 200, overflowY: 'auto' }}>
                {allSkills.map((s, i) => (
                  <div className="form-check" key={s.id || i}>
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(s.name)}
                      onChange={() => toggleSkill(s.name)}
                      id={`skill-${s.id}`}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor={`skill-${s.id}`}>{s.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/projects')}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProjectPage;
