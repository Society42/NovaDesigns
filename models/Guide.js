const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false, 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
});

module.exports = mongoose.model('Guide', guideSchema);
