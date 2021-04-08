import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
	{
		path: String,
		name: String
	},
	{ timestamps: true }
);

const file = mongoose.model('file', fileSchema);

export default file;

