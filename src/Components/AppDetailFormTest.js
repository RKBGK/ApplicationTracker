import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppNoteCard from './AppNoteCard';
import { getAppFB, updateAppFB } from '../api/data/appData';
import { createNote, getNotes } from '../api/data/noteData';

const initialState = {
  note: '',
};

export default function AppDetail() {
  const [formInput, setFormInput] = useState(initialState);
  const [card, setCard] = useState({});
  const [noteCards, setNoteCards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formNote, setFormNote] = useState(initialState);
  const { firebaseKey } = useParams();
  const [checked, setChecked] = useState();
  useEffect(() => {
    let isMounted = true;
    getAppFB(firebaseKey).then((cardObj) => {
      if (isMounted) setCard(cardObj);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);
  // since need to track change in notcard separately, created a new useeffect
  useEffect(() => {
    let isMounted = true;
    console.warn(firebaseKey);
    getNotes(firebaseKey).then((notes) => {
      if (isMounted) setNoteCards(notes);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  const handleClick = (method) => {
    if (method === 'addnote') {
      setShowForm(true);
    }
  };
  const resetForm = () => {
    setFormNote(initialState);
  };
  const handleSubmit = (e) => {
    // console.warn(e.noteobj.value);
    e.preventDefault();
    createNote({ ...formNote, appId: card.firebaseKey }).then((notes) => {
      setNoteCards(notes);
      resetForm();
      setShowForm(false);
    });
  };

  const handleToggle = () => {
    setChecked(!checked);
    const drawingcard = {
      email: card.email,
      name: card.name,
      address: card.address,
      firebaseKey: card.firebaseKey,
      details: card.details,
      status: card.status,
      phone: card.phone,
      image: card.image,
      drawingReceived: !card.drawingReceived,
      dateReceived: card.dateReceived,
    };
    updateAppFB(drawingcard).then(setCard);
  };

  const handleStatus = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    updateAppFB(formInput).then(setCard);
  };

  //  const handleStatus = (e) => {
  //    this.setState({ value: e.target.value });
  //  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        <div className="card-body">
          <h5 className="card-title">{card.email}</h5>
          <h5 className="card-title">{card.status}</h5>
          <div>
            <label>
              <input
                type="checkbox"
                checked={card.drawingReceived ? 'checked' : ''}
                onChange={handleToggle}
              />
              Drawing Received
            </label>
          </div>
          <form>
            <label htmlFor="dlstatus">Status</label>
            <select
              id="dlstatus"
              name="dlstatus"
              value={card.status}
              placeholder="Select Status"
              onChange={handleStatus}
            >
              <option value="">Status</option>
              <option value="1">Pending</option>
              <option value="2">In-Review</option>
              <option value="3">Rejected</option>
              <option value="4">Approved</option>
            </select>
          </form>
          <button
            onClick={() => handleClick('addnote')}
            className="btn btn-info"
            type="button"
          >
            Add a note
          </button>
          {showForm ? (
            <form onSubmit={handleSubmit}>
              <div className="m-3">
                <label htmlFor="note" className="form-label visually-hidden">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="note"
                  rows="3"
                  name="note"
                  value={formNote.note}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="m-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          ) : (
            ''
          )}
          <div className="d-flex flex-wrap">
            {noteCards.map((note) => (
              <AppNoteCard
                key={note.firebaseKey}
                noteObj={note}
                setNoteCards={setNoteCards}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
