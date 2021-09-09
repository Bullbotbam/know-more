const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280,
	},
	username: {
		type: String,
		required: true,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (createdAtVal) => dateFormat(createdAtVal),
	},
});

const ThoughtSchema = new Schema(
	{
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
			ref: 'User',
		},
		reactions: [ReactionSchema],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// create a virtual
ThoughtSchema.virtual('reactionCount', {
	ref: 'reactions',
	localField: '_id',
	foreignField: 'reactionId',
	count: true,
});

// create the thoughts model in ThoughtSchema
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
