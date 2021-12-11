import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import NoteCard from './NoteCard';
import { getNotes } from '../api/data/noteData';

// const initialState = {
//   note: '',
// };

export default function NoteCardList({ noteCards, setNoteCards }) {
  // const [noteCards, setNoteCards] = useState([]);
  const { firebaseKey } = useParams();
  useEffect(() => {
    let isMounted = true;
    getNotes(firebaseKey).then((notes) => {
      if (isMounted) setNoteCards(notes);
    });
    return () => {
      isMounted = false;
    }; // cleanup function
  }, []);

  return (
    <div className="card" style={{ width: '18rem', margin: '3px' }}>
      <div className="card-body">
        <div className="d-flex flex-wrap">
          {noteCards.map((note) => (
            <NoteCard
              key={note.firebaseKey}
              noteObj={note}
              setNoteCards={setNoteCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
NoteCardList.propTypes = {
  noteCards: PropTypes.shape(PropTypes.obj).isRequired,
  setNoteCards: PropTypes.isRequired,
};
