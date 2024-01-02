import {Transaction} from "../store/transactionsReducer.ts";
import {Vault} from "../store/vaultsReducer.ts";
import {Category} from "../store/catergoriesReducer.ts";

export const mapTransactionsWithVaultNames = (transactions: Transaction[], vaults: Vault[]) => {
	return transactions.map((t) => {
		const matchingVault = vaults.find((v) => v._id === t.vault);

		if (matchingVault) {
			return {
				...t,
				vault: matchingVault.name
			};
		}

		return t;
	});
};

export const mapTransactionsWithCategoryNames = (transactions: Transaction[], categories: Category[]) => {
	return transactions.map((t) => {
		const matchingCategory = categories.find((c) => c.key === t.category);

		if (matchingCategory) {
			return {
				...t,
				category: matchingCategory.label
			};
		}

		return t;
	});
};