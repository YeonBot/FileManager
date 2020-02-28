import MessageModel from '../models/message';
import ChatListModel from '../models/chatlist';
import WhisperModel from '../models/whisper';

export const addAllMessage = message => {
	MessageModel.create(message)
		.then(messageInfo => {
			return messageInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getAllMessage = message => {
	return MessageModel.find({})
		.then(messageInfo => {
			return messageInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getWhisperData = async whisperIds => {
	if (!whisperIds) return;

	const value = await Promise.all(
		whisperIds.map(async whisper => {
			// console.log(whisper);
			console.log(await WhisperModel.findOne({ _id: whisper.whisperId }));
			whisper = Object.assign(
				whisper,
				await WhisperModel.findOne({ _id: whisper.whisperId })
			);
		})
	);
};

export const getUserChatList = email => {
	return ChatListModel.findOne({ email: email })
		.then(result => {
			if (!result) return null;
			return result.chatList;
		})
		.catch(err => {
			throw err;
		});
};

/*
	message 에 기존 whisperID 있는지 확인
	있다면 whisperID 에 메세지 추가
	없다면 chat에 추가 후 메세지 추가. and whisperId 알려주기.
*/
export const addWhisperMessage = async (message, whisperId) => {
	console.log('귓속말 메시지 추가하기');
	console.log(whisperId);
	console.log(await WhisperModel.findOne({ _id: whisperId }));
	WhisperModel.updateOne(
		{ _id: whisperId },
		{ $push: { messageData:  message  } },
		{ upsert: true }
	);
};

export const addFirstWhisperMessage = async (message, fromUser, toUser) => {
	console.log('첫번째 방이니까 추가하기');
	const whisperRoom = await WhisperModel.create({ messageData: message })
		.then(whisperData => {
			return whisperData;
		})
		.catch(err => {
			throw err;
		});
	console.log(whisperRoom);
	console.log(whisperRoom._id);

	AddChatList(fromUser, toUser, whisperRoom._id);

	console.log('생성후 리턴 방 아이디' + whisperRoom._id);
	return whisperRoom._id;
};

export const checkChatList = async (fromUser, toUser) => {
	console.log('채팅 리스트 체크');
	const userChatList = await ChatListModel.findOne({ email: fromUser }).then(result => {
		if (!result) return null;
		return result.chatList;
	});

	if (!userChatList) {
		return null;
	}
	console.log('체크');
	console.log(toUser);
	const chat = await userChatList.find(element => {
		console.log(element.email);
		return element.email === toUser;
	});
	if (!chat) {
		return null;
	}
	console.log('있다면 리턴 방 아이디' + chat.whisperId);
	return chat.whisperId;
};

export const AddChatList = (fromUser, toUser, whisper) => {
	console.log('유저에게 채팅 리스트 추가 하기');
	ChatListModel.updateOne(
		{ email: fromUser },
		{
			$push: {
				chatList: {
					email: toUser,
					whisperId: whisper._id
				}
			}
		},
		{ upsert: true }
	).catch(err => {
		throw err;
	});

	if (fromUser === toUser) {
		return;
	}

	ChatListModel.updateOne(
		{ email: toUser },
		{
			$push: {
				chatList: {
					email: fromUser,
					whisperId: whisper._id
				}
			}
		},
		//options
		{ upsert: true }
	).catch(err => {
		throw err;
	});
};