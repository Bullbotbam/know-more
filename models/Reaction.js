const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
	reactionId: {
		type: Schema.Types.ObjectId,
		default: ObjectId,
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// create the Reaction model in ReactionSchema
const Reaction = model('Reaction', ReactionSchema);

module.exports = Reaction;
