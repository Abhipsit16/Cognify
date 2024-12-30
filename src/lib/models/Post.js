// const { data } = require('framer-motion/client');
// const { Accessibility } = require('lucide-react');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require('mongoose');
// import UserSchema from './User';

const Datalinkschema = new mongoose.Schema({
  datalink: { type: String, required: true },
  AccessUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  AccessLevel: { type: String },
});

const postSchema = new mongoose.Schema({
    heading: { type: String },
    content: { type: String  },
    Type: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User document
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }], // Reference to Tag documents
    createdAt: { type: Date, default: Date.now },
    dataSample: { type: String, }, // Nullable field for image, file, or video
    dataLink: [Datalinkschema],
    AccessLevel: { type: String},
    // ... other post fields
},{strict : false});

  
module.exports= mongoose.models.Post || mongoose.model('Post', postSchema);