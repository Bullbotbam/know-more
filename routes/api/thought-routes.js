const router = require('express').Router();
const {
	getAllThoughts,
	addThought,
	addReaction,
	removeThought,
	removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts);

module.exports = router;
