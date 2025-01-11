import Post from '@/lib/models/Post';
import connectDB from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { postId, userId, action } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update access for all datalinks in the post
    if (action === 'add') {
      post.dataLink.forEach(link => {
        if (!link.AccessUsers.includes(userId)) {
          link.AccessUsers.push(userId);
        }
      });
    } else if (action === 'remove') {
      post.dataLink.forEach(link => {
        link.AccessUsers = link.AccessUsers.filter(id => id.toString() !== userId);
      });
    }

    await post.save();
    return res.status(200).json({ message: 'Access updated successfully' });
  } catch (error) {
    console.error('Error updating access:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
