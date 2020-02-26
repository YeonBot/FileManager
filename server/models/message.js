import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		message: { type: String, required: true }
	},
	{
		timestamps: true
	}
);
mongoose.set('useCreateIndex', true);
export default mongoose.model('Message', MessageSchema);