// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['individual', 'organization'], default: 'individual' }, // Add role field
  createdAt: { type: Date, default: Date.now },
  clerkId: { type: String, required: true, unique: true },
  socketId: { type: String},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // Reference to Tag documents

},{strict : false});

module.exports= mongoose.models.User || mongoose.model('User', UserSchema);
