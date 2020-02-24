import './dotenv';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import webSocketLoader from './webSocket';

export default async ({ expressApp }) => {
	const mongoConnection = await mongooseLoader();
	console.log('MongoDB Intialized');
	const server = await expressLoader({ app: expressApp });
	console.log('Express Intialized');
	await webSocketLoader({server});
	console.log('WebSocket Intialized');
	
	//More Loader | Redis Config | Initialize agenda ..
	
	return server;
};