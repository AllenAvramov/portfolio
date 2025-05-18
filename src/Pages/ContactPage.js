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
            <p><i className="fa fa-envelope me-2 text-primary"></i> Tamar - </p>
            <p><i className="fa fa-envelope me-2 text-primary"></i> Tamarsapir05@gmail.com </p>
            <p><i className="fa fa-map-marker me-2 text-primary"></i>Allen - </p>
            <p><i className="fa fa-phone me-2 text-primary"></i>allenjob96@gmail.com</p>
            <div className="social-icons mt-4">
              <a href="https://github.com" target="_blank" rel="noreferrer"><i className="fa fa-github"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"><i className="fa fa-linkedin"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fa fa-instagram"></i></a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-md-7">
          <form className="contact-form card shadow-sm p-4">
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input type="text" className="form-control" placeholder="John Doe" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control" placeholder="you@example.com" required />
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
