import connectToDatabase from '../../lib/mongodb';
import Chat from '../../models/Chat';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      
      const { chatId, senderId, message } = req.body;

      const newMessage = {
        sender_id: senderId,
        message: message,
        sent_at: new Date()
      };

      // Find or create a chat document and add the message
      await Chat.updateOne(
        { chat_id: chatId },
        { $push: { messages: newMessage } },
        { upsert: true }
      );

      // Return the new message
      return res.status(200).json(newMessage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
