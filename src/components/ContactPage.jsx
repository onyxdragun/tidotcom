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
        console.log(error.response);
        setSubmitted(false);
        if (error.response) {
          switch (error.response.status) {
            case 503:
              console.error('Mailgun Server is busy: ', error.response.data.messsage);
              break;
            case 500:
              console.error('Express server error: ', error.response.data.message);
              break;
            default:
              console.error('Unknown error: ', error.response.data.message);
          }
        } else if (error.request) {
          console.error('Backend not reachable. Please try again later');
        } else {
          console.error('Error: ', error.message);
        }
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
            <label className="contactpage__label" htmlFor="name">Your Name: (required)</label>
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
            <label className="contactpage__label" htmlFor="email">Your Email: (required)</label>
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
            <label className="contactpage__label" htmlFor="message">Your Message: (required)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="contactpage__input contactpage__textarea"
              placeholder="Enter your message..."
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