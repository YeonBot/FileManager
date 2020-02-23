import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
	{
		userEmail: { type: String, required: true },
		originalname: { type: String, required: true },
		path: { type: String, required: true }
	},
	{
		timestamps: true
	}
);
mongoose.set('useCreateIndex', true);
export default mongoose.model('File', fileSchema);