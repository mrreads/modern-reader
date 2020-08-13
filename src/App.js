import React, { useState} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import './resources/css/general.css';
import './resources/css/theme.css';

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
	
	const [settings, updateSetting] = useState(JSON.parse(fs.readFileSync(userPath.settings, 'utf8')));
	const [padding, updatePadding] = useState(settings.padding);
    const [fontSize, updateFontSize] = useState(settings.fontSize);
	const [lineHeight, updateLineHeight] = useState(settings.lineHeight);
	const [theme, updateTheme] = useState(settings.theme);
	let getStyles = { padding: padding, fontSize: fontSize, lineHeight: lineHeight, theme: theme }
	let setStyles = { updatePadding: updatePadding, updateFontSize: updateFontSize, updateLineHeight: updateLineHeight, updateTheme: updateTheme };
	
	if (theme === 'light')
	{
		document.documentElement.style.setProperty("--theme-main-color", "rgb(255, 255, 255)");
		document.documentElement.style.setProperty("--theme-second-color", "rgb(33, 38, 43)");
		document.documentElement.style.setProperty("--theme-three-color", "rgb(44, 62, 80)");
		document.documentElement.style.setProperty("--theme-four-color", "#e4e6e7");
	}
	if (theme === 'brown')
	{
		document.documentElement.style.setProperty("--theme-main-color", "#e1cd9c");
		document.documentElement.style.setProperty("--theme-second-color", "rgb(33, 38, 43)");
		document.documentElement.style.setProperty("--theme-three-color", "#625a47");
		document.documentElement.style.setProperty("--theme-four-color", "#c4b58f");
	}
	if (theme === 'dark')
	{
		document.documentElement.style.setProperty("--theme-main-color", "rgb(33, 38, 43)");
		document.documentElement.style.setProperty("--theme-second-color", "rgb(255, 255, 255)");
		document.documentElement.style.setProperty("--theme-three-color", "#979aa0");
		document.documentElement.style.setProperty("--theme-four-color", "#545659");
	}

	return (
	<BrowserRouter>
		<Redirect from='/' to='/shelf/books' />
		
		<TitleBar changeView={changeView} data={viewSetup} getStyles={getStyles} settings={settings} />
		
		<Route path="/viewer" > <Viewer toggle={viewSetup} 
										getStyles={getStyles}
										setStyles={setStyles}
										/> </Route>
		
		<Route path="/shelf" component={SideBar} />

		<Switch>
			<Route exact path="/shelf/books"> <Books data={books} toUpdate={upateBooks} /> </Route>
			<Route exact path="/shelf/notes" component={Notes} />
			<Route exact path="/shelf/settings" component={Settings} />
		</Switch>
		
	</BrowserRouter>);
}

export default App;
