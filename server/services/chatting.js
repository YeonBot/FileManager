import MessageModel from '../models/message';

export const addAllMessage = (message) => {
	MessageModel.create(message)
		.then(messageInfo => {
			return messageInfo;
		})
		.catch(err => {
			throw err;
		});
};

export const getAllMessage = (message) => {
	return MessageModel.find({})
		.then(messageInfo => {
			return messageInfo;
		})
		.catch(err => {
			throw err;
		});
};

