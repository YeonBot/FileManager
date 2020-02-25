import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
	{
		channel: { type: String, required: true },
		userName: { type: String, required: true },
		message: { type: String, required: true }
	},
	{
		timestamps: true
	}
);
mongoose.set('useCreateIndex', true);
export default mongoose.model('Message', MessageSchema);