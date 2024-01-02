import mongoose, {Types} from 'mongoose';
import Currency, {ICurrency} from '../model/currency-rates';
import Vault, {IVault} from '../model/vaults';
import Transaction, {ITransaction} from '../model/transactions';
import {config} from '../config';

const currenciesSeed: ICurrency[] = [
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

const generateVaultSeed = (currenciesMap: Record<string, Types.ObjectId>): IVault[] => {
    return [
        {
            name: 'Unicredit',
            balance: 150,
            type: 'digital',
            currency: currenciesMap['BGN']._id,
        },
        {
            name: 'Wallet',
            balance: 250,
            type: 'cash',
            currency: currenciesMap['BGN']._id,
        },
        {
            name: 'Revolut EUR',
            balance: 100,
            type: 'digital',
            currency: currenciesMap['EUR']._id,
        },
        {
            name: 'Revolut USD',
            balance: 100,
            type: 'digital',
            currency: currenciesMap['USD']._id,
        },
    ];
};

const generateTransactionSeed = (vaults: IVault[]): ITransaction[] => {
    return [
        {
            amount: 6.15,
            transactionType: 'expense',
            description: 'Lunch during work',
            category: 'Supermarkets',
            vault: vaults.find((vault: IVault) => vault.name === 'Wallet')?._id,
            date: new Date(),
        },
        {
            amount: 45,
            transactionType: 'expense',
            description: 'Bought new udemy course.',
            category: 'Others',
            vault: vaults.find((vault: IVault) => vault.name === 'Revolut USD')?._id,
            date: new Date(),
        },
        {
            amount: 9999,
            transactionType: 'income',
            description: 'Salary form Umbrella Corp',
            category: 'Salary',
            vault: vaults.find((vault: IVault) => vault.name === 'Unicredit')?._id,
            date: new Date(),
        },
        {
            amount: 500.00,
            transactionType: 'income',
            description: 'Random bonus for good work.',
            category: 'Bonus',
            vault: vaults.find((vault: IVault) => vault.name === 'Revolut EUR')?._id,
            date: new Date(),
        },
    ];
};

mongoose.set('strictQuery', false);

mongoose
    .connect(config.databaseUrl)
    .then(() => {
        console.log('Mongo Connection Open!');
    })
    .catch((err) => {
        console.log(err);
    });

const seedDB = async (): Promise<void> => {
    // ---- Seed Currencies ---
    await Currency.deleteMany({});
    const insertedCurrencies: ICurrency[] = await Currency.insertMany(
        currenciesSeed
    );

    const currenciesMap = insertedCurrencies.reduce(
        (accumulator: Record<string, Types.ObjectId>, currency: ICurrency) => {
            accumulator[currency.code] = currency._id!;
            return accumulator;
        },
        {} as Record<string, Types.ObjectId>
    );

    // ---- Seed Vaults ---
    const vaultsSeed = generateVaultSeed(currenciesMap);
    await Vault.deleteMany({});
    const insertedVaults: IVault[] = await Vault.insertMany(vaultsSeed);

    // ---- Seed Transactions ---
    const transactionsSeed = generateTransactionSeed(insertedVaults);
    await Transaction.deleteMany({});
    await Transaction.insertMany(transactionsSeed);
};

seedDB().then(() => {
    console.log('Database populated.');
    return mongoose.connection.close();
});
