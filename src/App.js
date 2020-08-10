import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import './resources/css/general.css';

import TitleBar from './resources/Components/TitleBar/TitleBar';
import SideBar from './resources/Components/SideBar/SideBar';

import Books from './resources/Components/Books/Books';
import Notes from './resources/Components/Notes/Notes';
import Settings from './resources/Components/Settings/Settings';

function App() 
{
return (
	<BrowserRouter>
		<SideBar />
		<TitleBar />
		
		<div id="content">
			<Switch>
				<Route exact path="/" component={Books} />
				<Route exact path="/notes" component={Notes} />
				<Route exact path="/settings" component={Settings} />
			</Switch>
		</div>
	</BrowserRouter>);
}

export default App;
