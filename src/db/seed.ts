import mongoose from 'mongoose'
import { TransactionImpl, default as Transaction } from '../model/transactions'
import { VaultImpl, default as Vault } from '../model/vaults';
import { CurrencyImpl, default as Currency } from '../model/currency-rates'
import { config } from '../config'

const seedCurrencies: CurrencyImpl[] = [
  {
    code: 'BGN',
    rate: 1.95,
  },
  {
    code: 'EUR',
    rate: 1.0,
  },
  {
    code: 'USD',
    rate: 1.08,
  },
]

mongoose
  .connect(config.databaseUrl)
  .then(() => {
    console.log('Mongo Connection Open!!!')
  })
  .catch((err) => {
    console.log(err)
  })

// TODO: Fix seed
const seedDB = async () => {
  await Currency.deleteMany({})
  const insertedCurrencies: CurrencyImpl[] = await Currency.insertMany(seedCurrencies);

  // TODO: add Types
  const currenciesMap = insertedCurrencies.reduce((accumulator: any, currency: CurrencyImpl) => {
    accumulator[currency.code] = currency._id;
    return accumulator;
  }, {});

}

seedDB().then(() => {
  console.log('Database populated.');
  return mongoose.connection.close();
})