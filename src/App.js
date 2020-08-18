import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import './resources/css/general.css';
import './resources/css/theme.css';

import TitleBar from './components/TitleBar/TitleBar';
import SideBar from './components/SideBar/SideBar';

import Viewer from './components/Viewer/Viewer';

import Books from './components/Books/Books';
import Notes from './components/Notes/Notes';
import Settings from './components/Settings/Settings';

import useBookHooks from './hooks/bookHooks';
import useSettingHooks from './hooks/settingHooks';

function App () 
{
	const booksHook = useBookHooks();
	const settingHook = useSettingHooks();

	return (
	<BrowserRouter>

		<Redirect from='/' to='/shelf/books' />
		
		<TitleBar  settings={ settingHook } />
		
		<Route path="/viewer" > <Viewer settings={ settingHook } /> </Route>
		
		<Route path="/shelf"> <SideBar /> </Route>

		<Switch>
			<Route exact path="/shelf/books"> <Books books={ booksHook } /> </Route>
			<Route exact path="/shelf/notes" component={ Notes } />
			<Route exact path="/shelf/settings"> <Settings settings={ settingHook } /> </Route>
		</Switch>
		
	</BrowserRouter>);
}

export default App;
