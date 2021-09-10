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
	.route('/:thoughtId')
	.get(getThoughtById)
	.post(addThought)
	.put(updateThought)
	.delete(removeThought);

// /api/thoughts/reactions
router.route('/:thoughtId/reactions/').post(addReaction).delete(removeReaction);

router.route('/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
