import React, { useState} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import './resources/css/general.css';

import TitleBar from './resources/Components/TitleBar/TitleBar';
import SideBar from './resources/Components/SideBar/SideBar';

import Viewer from './resources/Components/Viewer/Viewer';

import Books from './resources/Components/Books/Books';
import Notes from './resources/Components/Notes/Notes';
import Settings from './resources/Components/Settings/Settings';

const fs = window.require('fs');
const userPath = require('./data').userPath;

function App () 
{	
	const [books, upateBooks] = useState(JSON.parse(fs.readFileSync(userPath.books, 'utf8')));
	const [viewSetup, changeView] = useState(false);

	return (
	<BrowserRouter>
		<Redirect from='/' to='/shelf/books' />
		
		<TitleBar changeView={changeView} data={viewSetup} />
		
		<Route path="/viewer" > <Viewer toggle={viewSetup} /> </Route>
		
		<Route path="/shelf" component={SideBar} />

		<Switch>
			<Route exact path="/shelf/books"> <Books data={books} toUpdate={upateBooks} /> </Route>
			<Route exact path="/shelf/notes" component={Notes} />
			<Route exact path="/shelf/settings" component={Settings} />
		</Switch>
		
	</BrowserRouter>);
}

export default App;
