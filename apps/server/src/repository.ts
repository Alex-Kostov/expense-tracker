import Transaction, {ITransaction} from "./model/transactions";

export const getTransactions = async (type?: string): Promise<ITransaction[]> => {
	let transactions;

	if (type && (type === "income" || type === "expense")) {
		transactions = await Transaction.find({transactionType: type});
	} else {
		transactions = await Transaction.find();
	}

	return transactions;
};