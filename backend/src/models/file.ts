import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
	{
		path: {type: String, unique: true, required: true},
		name: {type: String, required: true}
	},
	{ timestamps: true }
);

const file = mongoose.model('file', fileSchema);

export default file;

