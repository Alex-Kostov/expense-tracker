import {configureStore} from "@reduxjs/toolkit";
import uiReducer, {UIState} from "./uiReducer.ts";

export interface StoreState {
	ui: UIState
}

const store = configureStore({
	reducer: {ui: uiReducer},
});

export default store;

// Example usage can be seen here: https://github.com/Alex-Kostov/udemy-react/tree/main/20-starting-project/src/components
