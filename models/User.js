const { Schema, model, SchemaTypes } = require('mongoose');

const UserSchema = new Schema(
	{
		username: {
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
		thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }],
		friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// create a virtual
UserSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

// creating a User model using UserSchema
const User = model('User', UserSchema);

// eporting the User model
module.exports = User;
