import dbConnect from '@/lib/mongodb';
import User from "@/lib/models/User";

async function getUserByClerkId(clerkId) {
  await dbConnect();
  const user = await User.findOne({ clerkId: clerkId }).lean();
  return user;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userID } = req.body;
      const user = await getUserByClerkId(userID);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
