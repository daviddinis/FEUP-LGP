import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);

export default User;

/*
const User = mongoose.model<UserDoc, UserModelInterface>("User", UserSchema);

interface IUser {
	username: string;
}

interface UserModelInterface extends mongoose.Model<UserDoc> {
	build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
	username: string;
}

UserSchema.statics.build = (attr: IUser) => {
	return new User(attr);
};

User.build({
	username: "Username...",
});
*/

