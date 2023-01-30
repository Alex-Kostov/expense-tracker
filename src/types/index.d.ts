import {CurrencyImpl} from '../model/currency-rates';
import {Document} from 'mongoose';
import {VaultImpl} from '../model/vaults';
import {TransactionImpl} from '../model/transactions';

export {};

interface CurrencyDocImpl extends CurrencyImpl, Document {}
interface VaultDocImpl extends VaultImpl, Document {}
interface TransactionDocImpl extends TransactionImpl, Document {}

declare global {
    namespace Express {
        interface Response {
            currency: CurrencyDocImpl;
            vault: VaultDocImpl;
            transaction: TransactionDocImpl;
        }
    }
}
