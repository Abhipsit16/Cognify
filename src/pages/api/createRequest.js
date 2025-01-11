import dbConnect from '@/lib/mongodb';
// import User from "@/lib/models/User";
import Request from "@/lib/models/Request";
// import Post from "@/lib/models/Post";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    try {
      const { fromUser, toUser, postId, message } = req.body; 
      const newRequest = await Request.create({
        fromUser,
        toUser,
        post: postId,
        message,
      });
      return res.status(200).json({ success: true, request: newRequest });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
