import express from 'express'
import { Configuration } from './Configuration'

class App {
	private express = express()

	configure() {
		this.express.disable('x-powered-by')
		this.express.listen(Configuration.shared.port, () => {
			console.log(
				`Server now listening on port ${Configuration.shared.port}`
			)
		})
	}
}

const app = new App()
app.configure()
