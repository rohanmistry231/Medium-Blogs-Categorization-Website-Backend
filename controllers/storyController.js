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

// @desc Add new story
// @route POST /api/stories
// @access Public
const addStory = async (req, res) => {
  const { title, link, category, thumbnail } = req.body;

  if (!title || !link || !category) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const newStory = new Story({ 
      title, 
      link, 
      category, 
      thumbnail: thumbnail || 'https://via.placeholder.com/150' // Default thumbnail if none provided
    });

    const savedStory = await newStory.save();
    res.status(201).json(savedStory);
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
