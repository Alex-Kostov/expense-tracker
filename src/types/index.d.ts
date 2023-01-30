import { CurrencyImpl } from '../model/currency-rates';
import {Document} from 'mongoose';
import {VaultImpl} from '../model/vaults';

export {};

interface CurrencyDocImpl extends CurrencyImpl, Document{};
interface VaultDocImpl extends VaultImpl, Document{};

declare global {
	namespace Express {
		interface Response {
			currency: CurrencyDocImpl;
            vault: VaultDocImpl;
		}
	}
}