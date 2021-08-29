const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
	thoughtText: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 280,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	username: {
		type: String,
		required: true,
	},
	reactions: [],
});

// create a virtual
ThoughtSchema.virtual('reactionCount', {
	ref: 'reactions',
	localField: '_id',
	foreignField: 'reactionId',
	count: true,
});

// create the thoughts model in ThoughtSchema
const Thoughts = model('Thoughts', ThoughtSchema);
module.exports = Thoughts;
