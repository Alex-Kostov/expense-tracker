import {configureStore} from "@reduxjs/toolkit";
import uiReducer, {UIState} from "./uiReducer.ts";
import transactionsReducer, {TransactionsState} from "./transactionsReducer.ts";
import vaultsReducer, {VaultsState} from "./vaultsReducer.ts";

export interface StoreState {
	ui: UIState;
	transactions: TransactionsState;
	vaults: VaultsState;
}

const store = configureStore({
	reducer: {ui: uiReducer, transactions: transactionsReducer, vaults: vaultsReducer}
});

export default store;
