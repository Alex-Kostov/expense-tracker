import { CurrencyImpl } from '../model/currency-rates';
import {Document} from 'mongoose';

export {};

interface CurrencyDocImpl extends CurrencyImpl, Document{};

declare global {
	namespace Express {
		interface Response {
			currency: CurrencyDocImpl;
		}
	}
}