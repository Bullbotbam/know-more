const { Thought, User } = require('../models');

const thoughtController = {
	// get thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.populate({
				path: 'thoughts',
				select: '-__v',
			})
			.select('-__v')
			.sort({ _id: -1 })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	// add thought to user
	addThought({ params, body }, res) {
		console.log(body);
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((dbData) => {
				if (!dbData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => res.json(err));
	},

	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { replies: body } },
			{ new: true, runValidators: true }
		)
			.then((dbData) => {
				if (!dbData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => res.json(err));
	},

	// remove thought
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedthought) => {
				if (!deletedthought) {
					return res.status(404).json({ message: 'No thought with this id!' });
				}
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $pull: { thoughts: params.thoughtId } },
					{ new: true }
				);
			})
			.then((dbData) => {
				if (!dbData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => res.json(err));
	},

	// remove reaction
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { replies: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then((dbData) => res.json(dbData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
