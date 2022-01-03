import * as dotenv from 'dotenv'

export class Configuration {
	static shared: Configuration = new Configuration()

	constructor() {
		dotenv.config()
	}

	get port(): string {
		return process.env.PORT ?? ''
	}
}
