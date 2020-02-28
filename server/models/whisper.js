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

const WhisperSchema = new mongoose.Schema(
	{
		messageData: [MessageSchema]
	}
);

mongoose.set('useCreateIndex', true);

export default mongoose.model('Whisper', WhisperSchema);
