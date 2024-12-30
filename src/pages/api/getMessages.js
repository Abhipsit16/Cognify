import connectToDatabase from '../../lib/mongodb';
import Chat from '../../models/Chat';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      
      const { chatId } = req.query;

      const chat = await Chat.findOne({ chat_id: chatId }).select('messages -_id');

      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }

      return res.status(200).json(chat.messages);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
