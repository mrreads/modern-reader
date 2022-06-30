import React from 'react';
import ReactDOM from 'react-dom/client';

import { HashRouter  } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n  from "@/i18n";

import '@/styles/index.scss';

import StoreContext from '@/contexts/store'
import RootStore from '@/store'

import App from '@/App';

const store = new RootStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StoreContext.Provider value={store}>
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <App />
      </HashRouter>
    </I18nextProvider>
  </StoreContext.Provider>
);