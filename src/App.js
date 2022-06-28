import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TitleBar from '@/components/TitleBar';
import NavBar from '@/components/NavBar';

import First from '@/components/first';
import Second from '@/components/second';

function App() {
  return (
    <React.Fragment>

      <TitleBar />
      <NavBar />

      <div className='content'>
        <Routes>
          <Route path="/first" element={<First />} />
          <Route path="/second" element={<Second />} />
        </Routes>
      </div>


    </React.Fragment>
  );
}

export default App;
