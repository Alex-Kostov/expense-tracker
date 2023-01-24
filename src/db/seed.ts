import mongoose from 'mongoose';
import { CurrencyImpl, default as Currency } from '../model/currency-rates';
import { VaultImpl, default as Vault } from '../model/vaults';
import { TransactionImpl, default as Transaction } from '../model/transactions';
import { config } from '../config';

const currenciesSeed: CurrencyImpl[] = [
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
];

// TODO: add a proper types
const generateVaultSeed = (currenciesMap: any) => {
  const vaultsSeed: VaultImpl[] = [
    {
      name: 'Unicredit',
      type: 'digital',
      currency: currenciesMap['BGN']._id,
    },
    {
      name: 'Wallet',
      type: 'cash',
      currency: currenciesMap['BGN']._id,
    },
    {
      name: 'Revolut EUR',
      type: 'digital',
      currency: currenciesMap['EUR']._id,
    },
    {
      name: 'Revolut USD',
      type: 'digital',
      currency: currenciesMap['USD']._id,
    },
  ];
  return vaultsSeed;
};

// TODO: add a proper types
const generateTransactionSeed = (vaults: any) => {
  const transactionsSeed: TransactionImpl[] = [
    {
      amount: 6.15,
      transactionType: 'expense',
      description: 'food during work',
      category: 'Supermarkets',
      vault: vaults.find((vault: VaultImpl) => vault.name === 'Wallet')._id,
      date: new Date(),
    },
    {
      amount: 45,
      transactionType: 'expense',
      description: 'udemy ts course',
      category: 'Others',
      vault: vaults.find((vault: VaultImpl) => vault.name === 'Revolut USD')
        ._id,
      date: new Date(),
    },
  ];
  return transactionsSeed;
};

mongoose
  .connect(config.databaseUrl)
  .then(() => {
    console.log('Mongo Connection Open!!!');
  })
  .catch((err) => {
    console.log(err);
  });

// TODO: add a proper types
const seedDB = async () => {
  // ---- Seed Currencies ---
  await Currency.deleteMany({});
  const insertedCurrencies: CurrencyImpl[] = await Currency.insertMany(
    currenciesSeed
  );

  // TODO: add Reduce Type
  const currenciesMap = insertedCurrencies.reduce(
    (accumulator: any, currency: CurrencyImpl) => {
      accumulator[currency.code] = currency._id;
      return accumulator;
    },
    {}
  );

  // ---- Seed Vaults ---
  const vaultsSeed = generateVaultSeed(currenciesMap);
  await Vault.deleteMany({});
  const insertedVaults: VaultImpl[] = await Vault.insertMany(vaultsSeed);

  // ---- Seed Transactions ---
  const transactionsSeed = generateTransactionSeed(insertedVaults);
  await Transaction.deleteMany({});
  await Transaction.insertMany(transactionsSeed);
};

seedDB().then(() => {
  console.log('Database populated.');
  return mongoose.connection.close();
});
