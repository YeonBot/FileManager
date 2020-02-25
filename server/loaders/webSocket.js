const socketIO = require('socket.io');

export default async ({ server }) => {
	const io = socketIO(server, { path: '/api/socket' });

	io.on('connection', function(socket) {
		console.log('Client connected');
		
		socket.emit("chat message","채팅 시작 입니다")
		
		socket.on("Add message",req=>{
			console.log(req);
			socket.emit("chat message",req);
			socket.broadcast.emit("chat message",req);
		})

		socket.on('disconnect', () => {
			console.log('Client disconnected');
		});
	});
};
