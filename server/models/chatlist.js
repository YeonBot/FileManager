import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		whisperId: { type: String, required: true }
	},
	{
		timestamps: true
	}
);

const ChatListSchema = new mongoose.Schema(
	{
		email : { type: String, required: true, unique: true },
		chatList: [ChatSchema]
	}
);

mongoose.set('useCreateIndex', true);

export default mongoose.model('ChatList', ChatListSchema);
