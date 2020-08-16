import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import i18next from "./localization/i18n";
import { I18nextProvider } from "react-i18next";

ReactDOM.render(
	<React.StrictMode>
			<I18nextProvider i18n={ i18next }>
				<App />
			</I18nextProvider>
		</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
