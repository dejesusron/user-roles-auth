import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		role: {
			type: String,
		},
		name: {
			type: String,
			required: [true, 'Please add a name value'],
		},
		email: {
			type: String,
			required: [true, 'Please add a email value'],
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password value'],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
