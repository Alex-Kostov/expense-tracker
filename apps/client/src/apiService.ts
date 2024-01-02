import {json} from "react-router-dom";
import {Transaction} from "./store/transactionsReducer.ts";
import {Vault} from "./store/vaultsReducer.ts";

const API_BASE_URL = "http://localhost:3000/api/v1";

interface AddExpenseFormData {
	amount: number;
	description: string;
	category: string;
	date: string;
	transactionType: string;
	vault: string;
}

const apiService = {
	getTransactions: async (type: 'expense' | 'income') => {
		try {
			const response = await fetch(`${API_BASE_URL}/transactions?type=${type}`);

			if (!response.ok) {
				throw json({message: "Could not fetch transactions."}, {status: 500});
			} else {
				const resData: Transaction[] = await response.json();

				return resData.map((e) => {
					const dateObject = new Date(e.date);
					const date = new Intl.DateTimeFormat("en-GB").format(dateObject);

					return {
						...e,
						date
					};
				});
			}
		} catch (error: any) {
			throw new Error(`Error: ${error.message}`);
		}
	},

	addTransaction: async (formData: AddExpenseFormData) => {
		try {
			const response = await fetch(`${API_BASE_URL}/transactions`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({...formData})
			});

			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Failed to add transaction.");
			}
		} catch (error: any) {
			throw new Error(`Error: ${error.message}`);
		}
	},

	getVaults: async () => {
		try {
			const response = await fetch(`${API_BASE_URL}/vaults`);

			if (!response.ok) {
				throw json({message: "Could not fetch vaults."}, {status: 500});
			} else {
				const resData: Vault[] = await response.json();
				return resData.map(({__v, ...v}) => v);
			}
		} catch (error: any) {
			throw new Error(`Error: ${error.message}`);
		}
	}
};

export default apiService;