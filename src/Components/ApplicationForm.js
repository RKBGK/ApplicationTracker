import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Row } from 'react-bootstrap';
// import { Dropdown } from 'semantic-ui-react';
import { updateApp, createApp } from '../api/data/appData';

const AppForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

let today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();

today = `${mm}/${dd}/${yyyy}`;
const initialState = {
  email: '',
  name: '',
  address: '',
  firebaseKey: '',
  details: '',
  status: 'Pending',
  phone: '',
  image: '',
  drawingReceived: false,
  dateReceived: today,
};

export default function ApplicationForm({ appobj, user }) {
  const [formInput, setFormInput] = useState(initialState);
  const [showForm, setShowForm] = useState(true);
  const history = useHistory();
  // const [checked, setChecked] = useState();
  useEffect(() => {
    if (appobj.firebaseKey) {
      setFormInput({
        email: appobj.email,
        name: appobj.name,
        address: appobj.address,
        firebaseKey: appobj.firebaseKey,
        details: appobj.details,
        status: appobj.status,
        phone: appobj.phone,
        image: appobj.image,
        drawingReceived: appobj.drawingReceived,
        dateReceived: appobj.dateReceived,
      });
    }
  }, [appobj]);

  const resetForm = () => {
    setFormInput({ ...initialState });
  };

  const handleChange = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleToggle = (e) => {
  //   const { name, checked } = e.target;
  //   setFormInput((prevState) => ({
  //     ...prevState,
  //     [name]: checked,
  //   }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (appobj.firebaseKey) {
      updateApp(formInput).then(() => {
        resetForm();
      });
    } else {
      createApp({ ...formInput }).then(() => {
        resetForm();
      });
    }
    setShowForm(false);
  };
  console.warn(user);
  return (
    <div>
      {showForm ? (
        <AppForm onSubmit={handleSubmit}>
          <Row className="mb-3 d-flex" width="75%">
            <Form.Group>
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control
                id="name"
                name="name"
                type="text"
                placeholder="Enter First and Last Name"
                onChange={handleChange}
                value={formInput.name}
                style={{ width: '75%' }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 d-flex" width="75%">
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
                value={formInput.email}
                style={{ width: '75%' }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 d-flex" width="75%">
            <Form.Group>
              <Form.Label htmlFor="address">Address</Form.Label>
              <Form.Control
                id="address"
                name="address"
                type="text"
                placeholder="Enter Address"
                onChange={handleChange}
                value={formInput.address}
                style={{ width: '75%' }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 d-flex" width="75%">
            <Form.Group>
              <Form.Label htmlFor="details">Details</Form.Label>
              <Form.Control
                id="details"
                name="details"
                type="text"
                placeholder="Please enter details"
                onChange={handleChange}
                value={formInput.details}
                style={{ width: '75%' }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 d-flex" width="75%">
            <Form.Group>
              <Form.Label htmlFor="phone">Phone</Form.Label>
              <Form.Control
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter phone"
                onChange={handleChange}
                value={formInput.phone}
                style={{ width: '75%' }}
              />
            </Form.Group>
          </Row>
          {/* {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <Row className="mb-3 d-flex" width="75%">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formInput.status}
                placeholder="Select Status"
                onChange={handleChange}
              >
                <option value="">Status</option>
                <option value="1">Pending</option>
                <option value="2">In-Review</option>
                <option value="3">Rejected</option>
                <option value="4">Approved</option>
              </select>
            </Row>
          ) : (
            ''
          )} */}
          {/* {user?.role === 'Admin' || user?.role === 'Staff' ? (
            <label htmlFor="drawingReceived">
              <input
                id="drawingReceived"
                name="drawingReceived"
                type="checkbox"
                checked={formInput.drawingReceived ? 'checked' : ''}
                onChange={handleToggle}
              />
              Drawings Received?
            </label>
          ) : (
            ''
          )} */}
          {/* {user?.role === 'Admin' || user.role === 'Staff' ? (
            <Row className="mb-3 d-flex" width="75%">
              <Form.Group>
                <Form.Label htmlFor="dateReceived">Date Received</Form.Label>
                <Form.Control
                  id="dateReceived"
                  name="dateReceived"
                  type="text"
                  value={formInput.dateReceived}
                  onChange={handleChange}
                  style={{ width: '75%' }}
                />
              </Form.Group>
            </Row>
          ) : (
            ''
          )} */}
          <div className="mb-3 d-flex">
            <button className="btn btn-success" type="submit">
              {appobj?.firebaseKey ? 'Update' : 'Submit'}
            </button>
            <button
              onClick={() => history.push('/home')}
              className="btn btn-danger"
              type="button"
            >
              Cancel
            </button>
          </div>
        </AppForm>
      ) : (
        <h5>Please email the drawings to appdrawings@gmail.com</h5>
      )}
    </div>
  );
}

ApplicationForm.propTypes = {
  appobj: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    firebaseKey: PropTypes.string,
    details: PropTypes.string,
    status: PropTypes.string,
    phone: PropTypes.string,
    image: PropTypes.string,
    drawingReceived: PropTypes.bool,
    dateReceived: PropTypes.string,
  }),
  user: PropTypes.shape(PropTypes.obj),
};

ApplicationForm.defaultProps = {
  appobj: {},
  user: {},
};
