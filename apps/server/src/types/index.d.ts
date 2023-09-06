import {Document} from 'mongoose';

import {ICurrency} from '../model/currency-rates';
import {IVault} from '../model/vaults';
import {ITransaction} from '../model/transactions';

export {};

interface CurrencyDocImpl extends ICurrency, Document {}
interface VaultDocImpl extends IVault, Document {}
interface TransactionDocImpl extends ITransaction, Document {}

declare global {
    namespace Express {
        interface Response {
            currency: CurrencyDocImpl;
            vault: VaultDocImpl;
            transaction: TransactionDocImpl;
        }
    }
}
