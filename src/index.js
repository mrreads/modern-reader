import React from 'react';
import ReactDOM from 'react-dom/client';

import { HashRouter  } from "react-router-dom";

import { I18nextProvider } from "react-i18next";
import i18n  from "@/i18n";

import App from '@/App';

import '@/styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n}>
    <HashRouter>
      <App />
    </HashRouter>
  </I18nextProvider>

);