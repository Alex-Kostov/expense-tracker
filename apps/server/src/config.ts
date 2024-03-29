interface Config {
  databaseUrl: string;
  port: number;
  baseCurrency: string;
}

export const config: Config = {
  databaseUrl: 'mongodb://127.0.0.1/expenseTracker',
  port: 3000,
  baseCurrency: 'EUR',
};
