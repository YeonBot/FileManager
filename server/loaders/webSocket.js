const socketIO = require('socket.io');

import * as ChatService from '../services/chatting';

export default async ({ server }) => {
	const io = socketIO(server, { path: '/api/socket' });

	let userList = [];

	io.on('connection', function(socket) {
		// io.clients((err, clients) => {
		// 	if (err) throw err;
		// 	console.log('clients', clients);
		// });

		/*
			chat login : 처음 채팅 들어 왔을 경우 
			1. userList filter 를 통해 새로 고침 했는지 확인. 없다면 userList 추가 후 모두에게 들어 왔다고 알림
			2. 새로고침 한 경우 접속을 알리지 않음. userList를 다시 보내지도 않음.
		*/
		socket.on('chat login', async req => {
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
			if (flag) {
				ChatService.getAllMessage().then(result => {
					socket.emit('chat message', result);
					socket.emit('chat message', { message: `${req.name}님이 접속 하였습니다.` });
				});
				socket.emit('user list', userList);
			} else {
				//모두에게
				ChatService.getAllMessage().then(result => {
					socket.emit('chat message', result);
					io.emit('chat message', { message: `${req.name}님이 접속 하였습니다.` });
				});
				io.emit('user list', userList);
			}

			const whisperIds = await ChatService.getUserChatList(req.email).then(result => {
				return result;
			});
			
			const whisperData = await ChatService.getWhisperData(whisperIds);
			socket.emit('whisper Data', whisperData);
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
		socket.on('whisper message', async req => {
			console.log(req);
			let whisperId = null;
			const fromUser = socket.email;
			const toUser = userList.filter((element, idx, arr) => {
				return element.socketId == req.socketId;
			});

			if (!req.whisperId) {
				// 방 찾아보고 있다면 id 리턴
				whisperId = await ChatService.checkChatList(fromUser, toUser[0].email);
				// 방 없다면 생성
				if (!whisperId) {
					whisperId = await ChatService.addFirstWhisperMessage(
						req,
						fromUser,
						toUser[0].email
					);
				}

				//TODO: 사용자에게 귓속말 id 보내기 whisperId
			}

			ChatService.addWhisperMessage(req, whisperId);

			io.to(req.socketId).emit('whisper message', req);
			req.email = toUser[0].email;
			socket.emit('whisper message', req);
		});

		/*
			disconnect : 연결이 끊겼을때
			1. userList filter 를 이용해 유저 삭제
			2. user List 를 다시 보내준다.
			3. uset List 에 없다면 그냥 유실 된 socket Id.
		*/
		socket.on('disconnect', req => {
			// io.clients((err, clients) => {
			// 	if (err) throw err;
			// 	console.log('clients', clients);
			// });
			userList = userList.filter((element, idx, arr) => {
				return element.socketId != socket.id;
			});
			io.emit('user list', userList);
			// socket.broadcast.emit('chat message', { message: `${socket.name}님이 나갔습니다.` });
		});
	});
};