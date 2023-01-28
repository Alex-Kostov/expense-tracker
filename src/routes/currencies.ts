import express, {Request, Response, NextFunction} from 'express';
import {CurrencyImpl, default as Currency} from '../model/currency-rates';
const router = express.Router();

/**
 * Middleware function that getCurrency by id.
 * The currency is stored in the response.currency.
 */
const getCurrency = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const findResult = await Currency.findById(req.params.id);
        if (findResult === null) {
            return res.status(404).json({message: 'Cannot find currency'});
        }
        res.currency = findResult;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Get All Currencies
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const currencies: CurrencyImpl[] = await Currency.find();
        res.status(200).json(currencies);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Currency by id
router.get('/:id', getCurrency, async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(res.currency);
});

// Add currency
router.post('/', async (req: Request, res: Response): Promise<void> => {
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
router.patch('/:id', getCurrency, async (req: Request, res: Response): Promise<any> => {
    if (req.body.rate != null) res.currency.rate = req.body.rate;
    if (req.body.code != null) res.currency.code = req.body.code;

    if (req.body.code === undefined && req.body.rate === undefined) {
        return res.status(400).json({message: 'Nothing to update!'});
    }

    try {
        const updatedCurrency = await res.currency.save();
        res.json(updatedCurrency);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Currency
router.delete('/:id', getCurrency, async (req: Request, res: Response): Promise<void> => {
    try {
        await res.currency.remove();
        res.json({message: 'Deleted currency'});
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
