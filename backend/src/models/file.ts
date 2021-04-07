import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema(
	{
	    path: {type: String, unique: true, required: true}
	},
	{ timestamps: true }
);

const file = mongoose.model('file-test', fileSchema);

export default file;
