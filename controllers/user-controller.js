const { Thought, User } = require('../models');
const { param } = require('../routes/api');

const UserController = {
	// get all Users
	getAllUsers(req, res) {
		User.find({})

			.select('-__v')
			.sort({ _id: -1 })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	// get one User by id
	getUserById({ params }, res) {
		User.findOne({ _id: params.id })
			.select('-__v')

			.populate('thoughts')
			.populate('friends')

			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(400);
			});
	},

	// createUser
	createUser({ body }, res) {
		User.create(body)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},

	// update User by id
	updateUser({ params, body }, res) {
		User.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No User found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	// delete User
	deleteUser({ params }, res) {
		User.findOneAndDelete({ _id: params.id })
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},

	// add new friend to User
	addNewFriend({ params, body }, res) {
		User.findOneAndUpdate(
			{ _id: params.id },
			{ $addToSet: { friends: body } },
			{ new: true, runValidators: true }
		)
			.populate({
				path: 'user',
				select: '-__v',
			})
			.select('-__v')
			.then((dbData) => {
				if (!dbData) {
					res
						.status(404)
						.json({ message: 'No user was found with the id you provided ' });
					return;
				}
				res.json(dbData);
			})
			.catch((err) => res.json(err));
	},

	// delete friend
	deleteFriend({ params }, res) {
		User.findOneAndDelete({ _id: params.friendId })

			// 	{ $pull: { friends: { friendId: params.friendId } } },
			// 	{ new: true, runValidators: true }

			.then((dbData) => res.json(dbData))
			.catch((err) => res.json(err));
	},
};

module.exports = UserController;
