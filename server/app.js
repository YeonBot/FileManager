import loaders from './loaders';
import express from 'express';

async function startServer() {
	const app = express();

	await loaders({ expressApp: app });

	const port = process.env.PORT || 3001;
	app.listen(port, err => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`Server Listening on port ${port}...`);
	});
}

startServer();

