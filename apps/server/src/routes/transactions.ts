import express, {NextFunction, Request, Response} from 'express';
import {default as Transaction, ITransaction} from '../model/transactions';

const router = express.Router();

const getTransaction = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const findResult = await Transaction.findById(req.params.id);
        if (findResult === null) {
            return res.status(404).json({message: 'Cannot find transaction'});
        }
        res.transaction = findResult;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Get All Transactions
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions: ITransaction[] = await Transaction.find();
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Transaction by id
router.get('/:id', getTransaction, async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(res.transaction);
});

// Add transaction
router.post('/', async (req: Request, res: Response): Promise<void> => {
    const transaction = new Transaction<ITransaction>({
        amount: req.body.amount,
        description: req.body.description,
        transactionType: req.body.transactionType,
        category: req.body.category,
        vault: req.body.vault,
        date: req.body.date,
    });

    try {
        const newTransaction = await transaction.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Transaction
router.patch('/:id', getTransaction, async (req: Request, res: Response): Promise<any> => {
    if (req.body.amount != null) res.transaction.amount = req.body.amount;
    if (req.body.description != null) res.transaction.description = req.body.description;
    if (req.body.transactionType != null) res.transaction.transactionType = req.body.transactionType;
    if (req.body.category != null) res.transaction.category = req.body.category;
    if (req.body.vault != null) res.transaction.vault = req.body.vault;
    if (req.body.date != null) res.transaction.date = req.body.date;
    // TODO : find better validation way. Very ugly and bad but it's copy paste from other routes.(for now)

    if (
        req.body.amount === undefined &&
        req.body.description === undefined &&
        req.body.transactionType === undefined &&
        req.body.category === undefined &&
        req.body.vault === undefined &&
        req.body.date === undefined
    ) {
        return res.status(400).json({message: 'Nothing to update!'});
    }

    try {
        const updatedTransaction = await res.transaction.save();
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Transaction
router.delete('/:id', getTransaction, async (req: Request, res: Response): Promise<void> => {
    try {
        await res.transaction.remove();
        res.json({message: 'Deleted transaction'});
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
