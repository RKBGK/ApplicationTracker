import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNotes } from '../api/data/noteData';
// import AppDetail from '../Components/AppDetail';
import DetailAppCard from '../Components/DetailAppCard';
import NoteCardForm from '../Components/NoteCardForm';
import NoteCardList from '../Components/NoteCardList';

export default function DetailApp() {
  const [noteCards, setNoteCards] = useState([]);
  const [editNote, setEditNote] = useState({});
  const { firebaseKey } = useParams();
  useEffect(() => {
    getNotes(firebaseKey).then(setNoteCards);
  }, []);

  return (
    <div>
      <DetailAppCard />
      <NoteCardForm editNote={editNote} setNoteCards={setNoteCards} />
      <NoteCardList
        noteCards={noteCards}
        setNoteCards={setNoteCards}
        setEditNote={setEditNote}
      />
      {/* <AppDetail /> */}
    </div>
  );
}
