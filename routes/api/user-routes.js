const router = require('express').Router();
const {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../../controllers/user-controller.js');
// set up GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);

//set up GET on, PUT and DELETE at /api/users/:id
router.route('/').get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
