import React, {ReactNode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {Provider} from "react-redux";
import store from "./store/store.ts";
import {fetchVaults} from "./store/vaultsReducer.ts";

// Populating the store on init.
store.dispatch(fetchVaults());

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode> as ReactNode
);