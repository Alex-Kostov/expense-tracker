import {Expense} from "../store/transactionsReducer.ts";
import {Vault} from "../store/vaultsReducer.ts";
import {Category} from "../store/catergoriesReducer.ts";

export const mapExpensesWithVaultNames = (expenses: Expense[], vaults: Vault[]) => {
	return expenses.map((e) => {
		const matchingVault = vaults.find((v) => v._id === e.vault);

		if (matchingVault) {
			return {
				...e,
				vault: matchingVault.name
			};
		}

		return e;
	});
};

export const mapExpensesWithCategoryNames = (expenses: Expense[], categories: Category[]) => {
	return expenses.map((e) => {
		const matchingCategory = categories.find((c) => c.key === e.category);

		if (matchingCategory) {
			return {
				...e,
				category: matchingCategory.label
			};
		}

		return e;
	});
};