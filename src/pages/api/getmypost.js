import dbConnect from '@/lib/mongodb';
import User from "@/lib/models/User";
import Post from "@/lib/models/Post";


async function getUserByClerkId(clerkId) {
  await dbConnect();
  const user = await User.findOne({ clerkId: clerkId }).lean();
  return user;
}
async function getPostsByAuthorID(authorID) {
    await dbConnect();
    const posts = await Post.find({ author: authorID }).lean();
    return posts;
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { userID } = req.body;
      const user = await getUserByClerkId(userID);

      const posts = await getPostsByAuthorID(user._id);
      
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
