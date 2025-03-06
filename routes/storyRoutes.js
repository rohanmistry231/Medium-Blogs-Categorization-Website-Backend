const express = require('express');
const router = express.Router();
const {
  getStories,
  addStory,
  updateStory,
  deleteStory,
} = require('../controllers/storyController');

router.route('/').get(getStories).post(addStory);
router.route('/:id').put(updateStory).delete(deleteStory);

module.exports = router;
