import Chat from '@/lib/models/Chat';
import  connectDB  from '@/lib/mongodb';
import User from '@/lib/models/User';

async function getUserByClerkId(clerkId) {
    await connectDB();
    const user = await User.findOne({ clerkId: clerkId });
    return user;
}
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await connectDB();
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const user1 = await getUserByClerkId(userId);
        const userID = user1._id;

        const chats = await Chat.find({ participants: userID })
            .populate('participants', 'username email')
            .populate('messages.sender_id', 'username email')
            .sort({ updatedAt: -1 });

        return res.status(200).json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
