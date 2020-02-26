const socketIO = require('socket.io');

import * as ChatService from '../services/chatting';

export default async ({ server }) => {
	const io = socketIO(server, { path: '/api/socket' });

	let userList = [];

	io.on('connection', function(socket) {
		io.clients((err, clients) => {
			if (err) throw err;
			console.log('clients', clients);
		});

		/* 
			chat login : 처음 채팅 들어 왔을 경우 
			1. userList filter 를 통해 새로 고침 했는지 확인. 없다면 userList 추가 후 모두에게 들어 왔다고 알림
			2. 새로고침 한 경우 접속을 알리지 않음. userList를 다시 보내지도 않음.
		*/
		socket.on('chat login', req => {
			socket.name = req.name;
			socket.email = req.email;
			let flag = false;
			userList = userList.filter((element, idx, arr) => {
				if (element.email == socket.email) flag = true;
				return element.email != socket.email;
			});

			userList.push({
				name: req.name,
				email: req.email,
				socketId: socket.id
			});
			
			// 새로고침시 나에게만
			if(flag){
				ChatService.getAllMessage()
				.then(result =>{
					socket.emit('chat message', result);
					socket.emit('chat message', { message: `${req.name}님이 접속 하였습니다.` });
				});
				socket.emit('user list', userList);	
			}
			//모두에게
			else{
				ChatService.getAllMessage()
				.then(result =>{
					socket.emit('chat message', result);
					io.emit('chat message', { message: `${req.name}님이 접속 하였습니다.` });
				});
				io.emit('user list', userList);
			}
		});

		/* 
			All message : 모두에게 보내는 메시지 
			1. 받은대로 모두에게 보내준다.
		*/
		socket.on('All message', req => {
			console.log(req);
			ChatService.addAllMessage(req);
			io.emit('chat message', req);
		});

		/* 
			whisper message : 귓속말
			1. socketId 를 이용해서 한명에게만 보내준다. 
		*/
		socket.on('whisper message', req => {
			console.log(req);
			io.to(req.socketId).emit('chat message', req);
		});

		/* 
			disconnect : 연결이 끊겼을때
			1. userList filter 를 이용해 유저 삭제
			2. user List 를 다시 보내준다.
			3. uset List 에 없다면 그냥 유실 된 socket Id.
		*/
		socket.on('disconnect', req => {
			io.clients((err, clients) => {
				if (err) throw err;
				console.log('clients', clients);
			});
			userList = userList.filter((element, idx, arr) => {
				return element.socketId != socket.id;
			});
			io.emit('user list', userList);
			// socket.broadcast.emit('chat message', { message: `${socket.name}님이 나갔습니다.` });
		});
	});
};