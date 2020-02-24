const socketIO = require('socket.io');

export default async ({ server }) => {
	const io = socketIO(server, { path: '/api/socket' });

	io.on('connection', function(socket) {
		console.log('user connected');
	});

	// io.on('connection', socket => {
	// 	console.log('a user connected');
	// 	socket.on('chat message', msg => {
	// 		io.emit('chat message', msg);
	// 	});
	// 	socket.on('disconnect', () => {
	// 		console.log('user disconnected');
	// 	});
	// });
};