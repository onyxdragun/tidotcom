import React, { useState } from "react";
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.message) formErrors.message = "Message is required";
    return formErrors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
      console.log("Form data submitted:", formData);
      try {
        const response = await axios.post('/api/mail/send', formData);
        if (response.status === 200) {
          console.log('Email sent successfully');
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="contactpage__container">
      {submitted ? (
        <h2>Message sent successfully<br />Thank you for contacting me!</h2>
      ) : (
        <form onSubmit={handleSubmit} className="contactpage__form">
          <div>
            <label className="contactpage__label" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="contactpage__input"
            />
            {errors.name && <p className="contactpage__error">{errors.name}</p>}
          </div>
          <div>
            <label className="contactpage__label" htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="contactpage__input"
            />
            {errors.email && <p className="contactpage__error">{errors.email}</p>}
          </div>
          <div>
            <label className="contactpage__label" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="contactpage__input contactpage__textarea"
            />
            {errors.message && <p className="contactpage__error">{errors.message}</p>}
          </div>
          <button type="submit" className="contactpage__btn">Send Message</button>
        </form >
      )}
    </div >
  );
};

export default ContactPage;