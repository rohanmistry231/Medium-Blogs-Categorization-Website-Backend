const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String, // URL for the thumbnail image
    required: false, // Optional, in case some stories don’t have thumbnails
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
