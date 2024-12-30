const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true, lowercase: true, trim: true }, // Ensure unique, lowercase, and trimmed tags
});
// const Tag = mongoose.model('Tag', tagSchema);
module.exports = mongoose.models.Tag || mongoose.model('Tag', tagSchema);