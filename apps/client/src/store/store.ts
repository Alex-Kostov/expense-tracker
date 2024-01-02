import {configureStore} from "@reduxjs/toolkit";
import uiReducer, {UIState} from "./uiReducer.ts";
import transactionsReducer, {TransactionsState} from "./transactionsReducer.ts";
import vaultsReducer, {VaultsState} from "./vaultsReducer.ts";
import categoriesReducer, {CategoriesState} from "./catergoriesReducer.ts";

export interface StoreState {
	ui: UIState;
	vaults: VaultsState;
	categories: CategoriesState;
	transactions: TransactionsState;
}

const store = configureStore({
	reducer: {
		ui: uiReducer,
		vaults: vaultsReducer,
		categories: categoriesReducer,
		transactions: transactionsReducer
	}
});

export default store;
