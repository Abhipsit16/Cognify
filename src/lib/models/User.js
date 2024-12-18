const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {type: String},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  clientId: { type: String, required: true, unique: true },
  socketId: { type: String, required: true },
},{strict : false});

module.exports= mongoose.models.User || mongoose.model('User', UserSchema);
