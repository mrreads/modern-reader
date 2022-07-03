import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TitleBar from '@/components/TitleBar';
import NavBar from '@/components/NavBar';

import Render from '@/views/Render';
import Library from '@/views/Library';
import Setting from '@/views/Settings';

function App() {
  return (
    <>

      <TitleBar />
      <NavBar />

      <div className='content'>
        <Routes>
          <Route path="/render" element={<Render />} />
          <Route path="/" element={<Library />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>


    </>
  );
}

export default App;
