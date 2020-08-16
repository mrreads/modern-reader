import React, { useState} from "react";
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
		
		<TitleBar changeView={ settingHook.setSettingWindowStatus }
				  data={ settingHook.getSettingWindowStatus }
				  getStyles={ settingHook.getStyles }
				  settings={ settingHook.getSetting } />
		
		<Route path="/viewer" > <Viewer toggle={ settingHook.getSettingWindowStatus }
										getStyles={ settingHook.getStyles }
										setStyles={ settingHook.setStyles }
										/> </Route>
		
		<Route path="/shelf"> <SideBar /> </Route>

		<Switch>
			<Route exact path="/shelf/books"> <Books data={ booksHook.getBooks } t
													 oUpdate={ booksHook.setBooks } /> </Route>
			<Route exact path="/shelf/notes" component={Notes} />
			<Route exact path="/shelf/settings" component={Settings} />
		</Switch>
		
	</BrowserRouter>);
}

export default App;
