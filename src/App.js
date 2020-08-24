import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import TitleBar from './components/TitleBar/TitleBar';
import SideBar from './components/SideBar/SideBar';

import Viewer from './components/Viewer/Viewer';

import Books from './components/Books/Books';
import Notes from './components/Notes/Notes';
import Settings from './components/Settings/Settings';

import useBookHooks from './hooks/bookHooks';
import useSettingHooks from './hooks/settingHooks';
import useTitleBarHooks from './hooks/titleBarHook';
import useNotesHooks from './hooks/notesHooks';

import 'rsuite/dist/styles/rsuite-default.css';
import './resources/css/general.css';
import './resources/css/custom-theme.scss';

function App () 
{
	const booksHook = useBookHooks();
	const settingHook = useSettingHooks();
	const titleHook = useTitleBarHooks();
	const notesHook = useNotesHooks();

	(settingHook.getDarkMode) ? document.body.classList.add('dark') : document.body.classList.remove('dark');

	return (
	<BrowserRouter>

		<Redirect from='/' to='/shelf/books' />
		
		<TitleBar  settings={ settingHook } titlebar={ titleHook } progress={ booksHook } notes={ notesHook } />
		
		<Route path="/viewer" > <Viewer settings={ settingHook } titlebar={ titleHook } progress={ booksHook } notes={ notesHook } /> </Route>
		
		<Route path="/shelf"> <SideBar titlebar={ titleHook } /> </Route>

		<Switch>
			<Route exact path="/shelf/books"> <Books books={ booksHook } /> </Route>
			<Route exact path="/shelf/notes" component={ Notes } />
			<Route exact path="/shelf/settings"> <Settings settings={ settingHook } /> </Route>
		</Switch>
		
	</BrowserRouter>);
}

export default App;
