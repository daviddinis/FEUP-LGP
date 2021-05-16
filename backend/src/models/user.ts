import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		passwordDigest: String,
		flagged: {
			type: Boolean,
			required: true,
			default: false
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true }
);

userSchema.methods.toJSON = function() {
	const obj : any = this.toObject();
	delete obj.passwordDigest;
	return obj;
}

const user = mongoose.model('User', userSchema);

export default user;

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

