import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import { CurrencyImpl, default as Currency } from '../model/currency-rates';

// TODO add return type
const getCurrency = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const findResult = await Currency.findById(req.params.id);
		if (findResult === null) {
			return res.status(404).json({ message: 'Cannot find currency' });
		}
		// TODO: Continue from here
		// @ts-ignore
		res.currency = findResult;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
};

router.get('/', async (req: Request, res: Response): Promise<void> => {
	try {
		const currencies: CurrencyImpl[] = await Currency.find();
		res.json(currencies);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id', getCurrency, async (req, res) => {
	// @ts-ignore
	res.json(res.currency);
});

// Add Currency
router.post('/', async (req, res) => {
	const currency = new Currency<CurrencyImpl>({
		code: req.body.code,
		rate: req.body.rate,
	});
	try {
		const newCurrency = await currency.save();
		res.status(201).json(newCurrency);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update Currency
router.patch('/:id', getCurrency, async (req, res) => {
	if (req.body.rate != null) {
		// @ts-ignore
		res.currency.rate = req.body.rate;
	}
	if (req.body.code != null) {
		// @ts-ignore
		res.currency.code = req.body.code;
	}
	try {
		// @ts-ignore
		const updatedCurrency = await res.currency.save();
		res.json(updatedCurrency);
	} catch (err) {
		res.status(400).json(err);
	}
});

// Delete Currency
router.delete('/:id', getCurrency, async (req, res) => {
	try {
		// @ts-ignore
		await res.currency.remove();
		res.json({ message: 'Deleted currency' });
	} catch (err) {
		res.status(500).json(err);
	}
});

export default router;
