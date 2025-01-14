// import dbConnect from '@/lib/dbConnect';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { postId, dataLink, userId } = req.body;
      await dbConnect();

      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ error: 'Post not found' });

      post.dataLink.push({
        datalink: dataLink,
        AccessUsers: [userId],
      });
      await post.save();

      return res.status(200).json({ message: 'Response added successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Server error' , error });
    }
  }
}
