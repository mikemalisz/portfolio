import express, { Request, Response } from 'express'
import path from 'path'
import childProcess from 'child_process'
import { Configuration } from './Configuration'

class App {
	private express = express()

	configure() {
		this.express.disable('x-powered-by')
		this.express.use(express.static('public'))

		this.express.get('/', this.sendPortfolio)
		this.express.get('/version', this.sendVersionInfo)
		this.express.listen(Configuration.shared.port, () => {
			console.log(
				`Server now listening on port ${Configuration.shared.port}`
			)
		})
	}

	private sendPortfolio(req: Request, res: Response) {
		res.sendFile(path.join(__dirname, '../', 'static/index.html'))
	}

	private sendVersionInfo(req: Request, res: Response) {
		// get commit hash and return it
		childProcess.exec('git rev-parse HEAD', (error, commitHash) => {
			const response = {
				commit: commitHash.trim(),
				date: new Date(),
			}
			res.json(response)
		})
	}
}

const app = new App()
app.configure()
