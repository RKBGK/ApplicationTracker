import React from 'react';
// import AppDetail from '../Components/AppDetail';
import DetailAppCard from '../Components/DetailAppCard';
import NoteCardList from '../Components/NoteCardList';

export default function DetailApp() {
  return (
    <div>
      <DetailAppCard />
      <NoteCardList />
      {/* <AppDetail /> */}
    </div>
  );
}
