const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender_id: { type: String, required: true },
  message: { type: String, required: true },
  sent_at: { type: Date, default: Date.now }
});

const chatSchema = new mongoose.Schema(
  {
    chat_id: { type: String, required: true, unique: true },
    participants: [String],
    messages: [messageSchema]
  },
  { timestamps: true }
);

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

module.exports= Chat;