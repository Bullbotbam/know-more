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
router.route('/').get(getAllThoughts);

// /api/thoughts/:id
router
	.route('/:id')
	.get(getThoughtById)
	.post(addThought)
	.put(updateThought)
	.delete(removeThought);

// /api/thoughts/reactions
router.route('/:id/reactions/').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;
