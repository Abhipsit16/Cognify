const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  sent_at: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [messageSchema]
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

module.exports = Chat;