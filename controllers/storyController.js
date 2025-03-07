const Story = require('../models/Story');

// @desc Get all stories
// @route GET /api/stories
// @access Public
const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add new story or multiple stories
// @route POST /api/stories
// @access Public
const addStory = async (req, res) => {
  const stories = Array.isArray(req.body) ? req.body : [req.body];

  // Validate each story
  const invalidStories = stories.filter(story => !story.title || !story.link || !story.category);
  if (invalidStories.length > 0) {
    return res.status(400).json({ message: 'Please fill all required fields for each story' });
  }

  try {
    const newStories = stories.map(story => ({
      title: story.title,
      link: story.link,
      category: story.category,
      thumbnail: story.thumbnail || 'https://via.placeholder.com/150', // Default thumbnail if none provided
    }));

    const savedStories = await Story.insertMany(newStories);
    res.status(201).json(savedStories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a story
// @route PUT /api/stories/:id
// @access Public
const updateStory = async (req, res) => {
  const { title, link, category, thumbnail } = req.body;

  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    story.title = title || story.title;
    story.link = link || story.link;
    story.category = category || story.category;
    story.thumbnail = thumbnail || story.thumbnail;

    const updatedStory = await story.save();
    res.status(200).json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a story
// @route DELETE /api/stories/:id
// @access Public
const deleteStory = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);

    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    await story.deleteOne();
    res.status(200).json({ message: 'Story removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStories,
  addStory,
  updateStory,
  deleteStory,
};
