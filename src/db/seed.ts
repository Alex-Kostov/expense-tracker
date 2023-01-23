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

const seedDB = async () => {
  await Currency.deleteMany({})
  await Currency.insertMany(seedCurrencies)
}

seedDB().then(() => {
  console.log('Database populated.');
  return mongoose.connection.close();
})