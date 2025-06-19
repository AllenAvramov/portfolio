import React, { useState } from 'react';
import './ContactPage.css';
import axios from 'axios';

function ContactPage() {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    message: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('https://server-l1gu.onrender.com/api/messages', formData);
      alert('Message sent!');
      setFormData({ sender_name: '', sender_email: '', message: '' });
    } catch (err) {
      alert('Something went wrong.');
      console.error(err);
    }
  };

  return (
<div className="contact-page container-fluid py-5">
      <h2 className="text-center mb-5">Contact Us</h2>
      <div className="row">
        {/* Contact Info */}
        <div className="col-md-5 mb-4">
          <div className="contact-info card shadow-sm p-4 h-100">
            <h4 className="mb-3">Get in touch</h4>
            <p><i className="fas fa-envelope me-2 text-primary"></i>Tamar - Tamarsapir05@gmail.com </p>
            <p><i className="fas fa-envelope me-2 text-primary"></i>Allen - allenjob96@gmail.com</p>
            <div className="social-icons mt-4">
              <a href="https://github.com/AllenAvramov" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/allen-avramov-7ab938315/" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://www.instagram.com/allenavramov/" target="_blank" rel="noreferrer" className="social-icon">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <form onSubmit={handleSubmit} className="contact-form card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                name="sender_name"
                value={formData.sender_name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="sender_email"
                value={formData.sender_email}
                onChange={handleChange}
                placeholder="you@gmail.com"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Write your message..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
