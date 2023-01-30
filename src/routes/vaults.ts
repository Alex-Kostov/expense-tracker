import express, {NextFunction, Request, Response} from 'express';
import {default as Vault, VaultImpl} from '../model/vaults';

const router = express.Router();

/**
 * Middleware function that getVault by id.
 * The vault is stored in the response.vault.
 */
const getVault = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const findResult = await Vault.findById(req.params.id);
        if (findResult === null) {
            return res.status(404).json({message: 'Cannot find vault'});
        }
        res.vault = findResult;
        next();
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Get All Vaults
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const vaults: VaultImpl[] = await Vault.find();
        res.status(200).json(vaults);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Vault by id
router.get('/:id', getVault, async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(res.vault);
});

// Add Vault
router.post('/', async (req: Request, res: Response): Promise<void> => {
    const vault = new Vault<VaultImpl>({
        name: req.body.name,
        balance: req.body.balance,
        type: req.body.type,
        currency: req.body.currency,
        // TODO: Update to currencyId
    });

    try {
        const newVault = await vault.save();
        res.status(201).json(newVault);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update Vault
router.patch('/:id', getVault, async (req: Request, res: Response): Promise<any> => {
    if (req.body.name != null) res.vault.name = req.body.name;
    if (req.body.balance != null) res.vault.balance = req.body.balance;
    if (req.body.type != null) res.vault.type = req.body.type;
    if (req.body.currency != null) res.vault.currency = req.body.currency;
    // TODO : find better validation way.

    if (
        req.body.name === undefined &&
        req.body.balance === undefined &&
        req.body.type === undefined &&
        req.body.currency === undefined
    ) {
        return res.status(400).json({message: 'Nothing to update!'});
    }

    try {
        const updatedVault = await res.vault.save();
        res.json(updatedVault);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete Vault
router.delete('/:id', getVault, async (req: Request, res: Response): Promise<void> => {
    try {
        await res.vault.remove();
        res.json({message: 'Deleted vault'});
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
