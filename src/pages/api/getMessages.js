import connectToDatabase from '../../lib/mongodb';
import Chat from '../../lib/models/Chat';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      
      const { chatId } = req.query;

      // Validate chatId
      if (!chatId || !mongoose.Types.ObjectId.isValid(chatId)) {
        return res.status(400).json({ 
          error: 'Invalid chat ID',
          messages: [] 
        });
      }

      const chat = await Chat.findOne({ _id: chatId });

      if (!chat) {
        return res.status(200).json({ messages: [] });
      }

      return res.status(200).json({ messages: chat.messages || [] });
    } catch (error) {
      console.error('Get messages error:', error);
      return res.status(500).json({ 
        error: 'Failed to retrieve messages',
        details: error.message 
      });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
