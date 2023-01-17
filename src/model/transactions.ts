import mongoose from "mongoose";
// * transactions
// - id
// - amount, ( 15,23 )
// - currency ( ID of BGN DEFAULT )
// - type, (expense, income)
// - category id ( 2 )
// - vault ( ID of the vault we make transations to)
// - date ( date of the transaction, can be from yestarday )
// - time created
// - time updated



const transactionSchema = new mongoose.Schema({
	amount: {
		type: Number,
		required: true,
		immutable: true,
		min: [0, 'Amount must be positive number'],
	},
	// TODO: Create the rest of the fields
});

// export default mongoose.model('Subscriber', subscriberSchema);