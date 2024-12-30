// const { data } = require('framer-motion/client');
// const { Accessibility } = require('lucide-react');
const mongoose = require('mongoose');
import UserSchema from './User';

const Datalinkschema = new mongoose.Schema({
  datalink: { type: String, required: true },
  AccessUsers: { UserSchema },
  AccessLevel: { type: String },
});

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    Type: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User document
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // Reference to Tag documents
    createdAt: { type: Date, default: Date.now },
    dataLink: [Datalinkschema],
    // ... other post fields
  });

  
module.exports= mongoose.models.Post || mongoose.model('Post', postSchema);