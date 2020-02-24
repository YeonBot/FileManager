import loaders from './loaders';
import express from 'express';

async function startServer() {
	const app = express();

	const server = await loaders({ expressApp: app });

	const port = process.env.PORT || 3001;
	server.listen(port, err => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(`Server Listening on port ${port}...`);
	});
}

startServer();