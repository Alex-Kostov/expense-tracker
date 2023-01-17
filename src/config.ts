interface Config {
	databaseUrl: string,
	port: number
};


export const config: Config = {
	databaseUrl: 'mongodb://127.0.0.1/subscribers',
	port: 3000
}

