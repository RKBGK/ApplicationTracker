import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getAppFB } from '../api/data/appData';
import { createNote, getNotes, updateNote } from '../api/data/noteData';

const initialState = {
  note: '',
};

export default function NoteCardForm({ editNote, setNoteCards }) {
  const [formNote, setFormNote] = useState(initialState);
  const { firebaseKey } = useParams();

  useEffect(() => {
    if (editNote.firebaseKey) {
      setFormNote({
        appId: editNote.appId,
        firebaseKey: editNote.firebaseKey,
        note: editNote.note,
      });
      getNotes(editNote.appId).then(setNoteCards);
    }
  }, [editNote]);

  const resetForm = () => {
    setFormNote(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editNote.firebaseKey) {
      updateNote(formNote).then((notes) => {
        setNoteCards(notes);
        resetForm();
      });
    } else {
      createNote({ ...formNote, appId: firebaseKey }).then((notes) => {
        setNoteCards(notes);
        resetForm();
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
              {editNote?.firebaseKey ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

NoteCardForm.propTypes = {
  editNote: PropTypes.shape(PropTypes.obj),
  setNoteCards: PropTypes.func.isRequired,
};

NoteCardForm.defaultProps = {
  editNote: {},
};
