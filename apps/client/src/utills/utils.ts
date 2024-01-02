import {Expense} from "../store/transactionsReducer.ts";
import {Vault} from "../store/vaultsReducer.ts";

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
