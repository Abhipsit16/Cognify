import connectToDatabase from '../../lib/mongodb';
import Chat from '../../lib/models/Chat';
import User from '../../lib/models/User';


async function getUserByClerkId(clerkId) {
  await connectToDatabase();
  const user = await User.findOne({ clerkId: clerkId });
  return user;
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();
      
      const { chatId, senderId, message } = req.body;

      // senderId = senderId.toString();
      const user1 = await getUserByClerkId(senderId);

      const senderID = user1._id;

      const newMessage = {
        sender_id: senderID,
        message: message,
        sent_at: new Date()
      };

      // Find or create a chat document and add the message
      await Chat.updateOne(
        { _id: chatId },
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
