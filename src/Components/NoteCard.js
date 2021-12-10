import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { deleteNote } from '../api/data/noteData';

export default function NoteCard({ noteObj, setNoteCards }) {
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    let isMounted = true;
    if (isMounted) console.warn(showForm);
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  const editNoteObj = () => {
    setShowForm(true);
  };
  const deleteNoteObj = () => {
    deleteNote(noteObj).then(setNoteCards);
  };

  const handleSubmit = (e) => {
    // console.warn(e.noteobj.value);
    e.preventDefault();
    console.warn(e.noteobj.value);
  };

  const handleChange = (e) => {
    console.warn(e.noteobj.value);
  };

  return (
    <div>
      <div className="card" style={{ width: '18rem', margin: '3px' }}>
        {showForm ? (
          <div>
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
          </div>
        ) : (
          ''
        )}
        <div className="card-body">
          <h5 className="card-title">{noteObj.note}</h5>
          <button
            onClick={() => editNoteObj()}
            className="btn btn-info"
            type="button"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNoteObj()}
            className="btn btn-danger"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    appId: PropTypes.string,
    note: PropTypes.string,
  }).isRequired,
  setNoteCards: PropTypes.func.isRequired,
};
