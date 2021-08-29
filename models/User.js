const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
	userName: {
		type: String,
		unique: true,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: 'Please enter a valid email',
		},
		required: [true, 'Email required'],
	},
	thoughts: [],
	friends: [],
});

// create a virtual
UserSchema.virtual('friendCount', {
	ref: 'friends',
	localField: '_id',
	foreignField: 'userId',
	count: true,
});

// creating a User model using UserSchema
const User = model('User', UserSchema);

// eporting the User model
module.exports = User;
