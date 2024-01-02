import {configureStore} from "@reduxjs/toolkit";
import uiReducer, {UIState} from "./uiReducer.ts";
import transactionsReducer, {TransactionsState} from "./transactionsReducer.ts";

export interface StoreState {
	ui: UIState;
	transactions: TransactionsState;
}

const store = configureStore({
	reducer: {ui: uiReducer, transactions: transactionsReducer}
});

export default store;
