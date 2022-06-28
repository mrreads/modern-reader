import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TitleBar from '@/components/TitleBar';
import NavBar from '@/components/NavBar';

import Library from '@/components/Library';
import Setting from '@/components/Setting';

function App() {
  return (
    <React.Fragment>

      <TitleBar />
      <NavBar />

      <div className='content'>
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>


    </React.Fragment>
  );
}

export default App;
