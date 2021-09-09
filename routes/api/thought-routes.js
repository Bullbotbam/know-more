const router = require('express').Router();
const {
	getAllThoughts,
	getThoughtById,
	addThought,
	updateThought,
	addReaction,
	removeThought,
	removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/').get(getAllThoughts).post(addThought);

// /api/thoughts/:id
router
	.route('/:id')
	.get(getThoughtById)
	.put(updateThought)
	.delete(removeThought);

// /api/thoughts/reactions
router.route('/:thoughtId/reactions/').post(addReaction).delete(removeReaction);

module.exports = router;
