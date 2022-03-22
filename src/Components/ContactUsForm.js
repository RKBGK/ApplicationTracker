import emailjs from 'emailjs-com';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import createContact from '../api/data/contactData';
import '../styles/contactUs.scss';

const ContactUsForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px;
  margin: 10px;
  box-shadow: 10px,
  border: 2px solid red;
  padding: 50px;
`;
const initialState = {
  name: '',
  email: '',
  comment: '',
};

export default function ContactForm() {
  const [formInput, setFormInput] = useState(initialState);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormInput(initialState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createContact({ ...formInput }).then(resetForm);
    setShowForm(false);
  };

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        'service_emqs4bs',
        'template_b0dw6k8',
        e.target,
        'user_VKlQBD3AKIqIGsx33rcs6',
      )
      .then(
        (result) => {
          console.warn(result.text);
        },
        (error) => {
          console.warn(error.text);
        },
      );
    handleSubmit(e);
  };

  return (
    <div>
      {showForm ? (
        <ContactUsForm onSubmit={sendEmail}>
          <Card className="contact-card">
            <h2>Please submit your question </h2>
            <div className="m-3">
              <label htmlFor="name" className="form-label visually-hidden">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                id="name"
                name="name"
                value={formInput.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="email" className="form-label visually-hidden">
                email
              </label>
              <input
                className="form-control"
                id="email"
                placeholder="Email"
                type="email"
                rows="3"
                name="email"
                value={formInput.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="m-3">
              <label htmlFor="comment" className="form-label visually-hidden">
                comment
              </label>
              <textarea
                className="form-control form-control-text"
                id="comment"
                placeholder="Please enter your message"
                rows="3"
                name="comment"
                value={formInput.comment}
                onChange={handleChange}
                required
              />
              <button type="submit" className="frm-submit-button">
                Submit
              </button>
            </div>
          </Card>
          {/* <Card>
            <div className="m-3">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </Card> */}
        </ContactUsForm>
      ) : (
        <Card className="contact-card">
          <h2>
            Thank you for contacting us. We will get back to you in 24-48 hours.
          </h2>
        </Card>
      )}
    </div>
  );
}
