const router = require('express').Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
	addNewFriend,
	deleteFriend,
} = require('../../controllers/user-controller.js');
// set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);

//set up GET on, PUT and DELETE at /api/users/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// add a new friend to user's friend list
router
	.route('/:userId/friends/:friendId')
	.post(addNewFriend)
	.delete(deleteFriend);

module.exports = router;
