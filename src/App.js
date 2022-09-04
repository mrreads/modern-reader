import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import useStore from '@/hooks/useStore'

import TitleBar from '@/components/TitleBar';
import NavBar from '@/components/NavBar';

import Render from '@/views/Render';
import Library from '@/views/Library';
import Setting from '@/views/Settings';

const App = observer(() => {
  const [ settingStore ] = useStore('settings');
  const { lightMode } = settingStore;

  useEffect(() => {
    (lightMode) ? document.documentElement.setAttribute('data-theme', 'light') : document.documentElement.setAttribute('data-theme', 'dark');
  }, [lightMode]);
  
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
})

export default App;
