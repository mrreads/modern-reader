import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TitleBar from '@/components/TitleBar';
import NavBar from '@/components/NavBar';

import Library from '@/components/LibraryPage';
import Setting from '@/components/SettingsPage';

function App() {
  return (
    <>

      <TitleBar />
      <NavBar />

      <div className='content'>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>


    </>
  );
}

export default App;
