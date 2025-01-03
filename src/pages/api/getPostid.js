import dbConnect from '@/lib/mongodb';
import Post from "@/lib/models/Post";

async function getPostbyid(Id) {
  await dbConnect();
  console.log(Id);
  const post = await Post.findOne({ _id: Id }).lean();
  console.log(post);
  return post;
}

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'GET') {
    try {
      const { PostId } = req.query;
      console.log(PostId);
      const post = await getPostbyid(PostId);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
