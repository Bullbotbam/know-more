const { Thought, User } = require('../models');

const thoughtController = {
	// get thoughts
	getAllThoughts(req, res) {
		Thought.find({})
			.populate('users')
			.populate('thoughts')
			.select('-__v')
			.sort({ _id: -1 })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},
	// get thoughts by id

	getThoughtById({ params }, res) {
		Thought.findOne({ _id: params.thoughtId })

			.then((dbData) => {
				if (!dbData) {
					res
						.status(404)
						.json({ message: 'No thought was found with this id' });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => res.json(err));
	},

	// add thought to user
	addThought({ params, body }, res) {
		console.log(body);
		Thought.create(body)

			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.userId },
					{ $push: { thoughts: thoughtId } },
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

	// update the thoughts
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })

			.then((dbData) => {
				if (!dbData) {
					res.status(404).json({ message: 'No user was found with this id' });
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

	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
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

	addReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $push: { reactions: body } },
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

	// remove reaction
	removeReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)

			.then((dbData) => res.json(dbData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
