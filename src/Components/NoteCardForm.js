import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppFB } from '../api/data/appData';
import { createNote } from '../api/data/noteData';

const initialState = {
  note: '',
};

export default function NoteCardForm() {
  const [showForm, setShowForm] = useState(false);
  const [formNote, setFormNote] = useState(initialState);
  const [noteCards, setNoteCards] = useState([]);
  const { firebaseKey } = useParams();
  useEffect(() => {
    let isMounted = true;
    console.warn(firebaseKey);
    console.warn(noteCards);
    getAppFB(firebaseKey).then((notes) => {
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
    createNote({ ...formNote, appId: firebaseKey }).then((notes) => {
      setNoteCards(notes);
      resetForm();
      setShowForm(false);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormNote((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="card-body">
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
      </div>
    </div>
  );
}
