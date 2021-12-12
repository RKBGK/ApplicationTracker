import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAppFB } from '../api/data/appData';
import { createNote, updateNote } from '../api/data/noteData';

const initialState = {
  note: '',
};

export default function NoteCardForm({ editNote, noteCards, setNoteCards }) {
  const [showForm, setShowForm] = useState(false);
  const [formNote, setFormNote] = useState(initialState);
  // const [formInput, setFormInput] = useState(initialState);
  // const [noteCards, setNoteCards] = useState([]);
  const { firebaseKey } = useParams();
  console.warn(editNote);

  useEffect(() => {
    if (editNote.firebaseKey) {
      setFormNote({
        appId: editNote.appId,
        firebaseKey: editNote.firebaseKey,
        note: editNote.note,
      });
    }
  }, [editNote]);

  useEffect(() => {
    let isMounted = true;
    console.warn(noteCards);
    getAppFB(firebaseKey).then((notes) => {
      if (isMounted) {
        setNoteCards(notes);
      }
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
    if (editNote.firebaseKey) {
      updateNote(formNote).then((notes) => {
        setNoteCards(notes);
        resetForm();
        setShowForm(false);
      });
    } else {
      createNote({ ...formNote, appId: firebaseKey }).then((notes) => {
        setNoteCards(notes);
        resetForm();
        setShowForm(false);
      });
    }
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

NoteCardForm.propTypes = {
  editNote: PropTypes.shape(PropTypes.obj),
  noteCards: PropTypes.func,
  setNoteCards: PropTypes.func.isRequired,
};

NoteCardForm.defaultProps = {
  editNote: {},
  noteCards: null,
};
