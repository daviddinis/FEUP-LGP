import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
	{
		path: {type: String, unique: true, required: true},
		name: {type: String, required: true},
		documentId: {type: String, required: true },
		type: { type: String, required: true },
		extracted: { type: Object }
	},
	{ timestamps: true }
);

const file = mongoose.model('file', fileSchema);

export default file;

