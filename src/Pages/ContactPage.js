import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page container py-5">
      <h2 className="text-center mb-5">Contact Us</h2>
      <div className="row">
        {/* Contact Info */}
        <div className="col-md-5 mb-4">
          <div className="contact-info card shadow-sm p-4 h-100">
            <h4 className="mb-3">Get in touch</h4>
            <p><i className="fas fa-envelope me-2 text-primary"></i>Tamar - Tamarsapir05@gmail.com </p>
            <p><i className="fas fa-envelope me-2 text-primary"></i>Allen - allenjob96@gmail.com</p>
            <div className="social-icons mt-4">
              <a href="https://github.com/AllenAvramov" target="_blank" rel="noreferrer" className="me-3">
                <i className="fab fa-github fa-2x"></i>
              </a>
              <a href="https://www.linkedin.com/in/allen-avramov-7ab938315/" target="_blank" rel="noreferrer" className="me-3">
                <i className="fab fa-linkedin fa-2x"></i>
              </a>
              <a href="https://www.instagram.com/allenavramov/" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <form className="contact-form card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-control" placeholder="Name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="you@gmail.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control" rows="5" placeholder="Write your message..." required></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
