// /pages/api/posts/searchByTags.js
// import dbConnect from '@/lib/mongodb'; // Ensure MongoDB connection
// import Post from '../../../models/Post';
// import Tag from '../../../models/Tag';
import dbConnect from '@/lib/mongodb';
import Post from "@/lib/models/Post";
import Tag from "@/lib/models/Tag";
// import User from "@/lib/models/User";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { tags } = req.query; // Pass tags as a comma-separated string, e.g., ?tags=tag1,tag2
  console.log(tags);
  if (!tags) {
    return res.status(400).json({ error: 'Tags are required' });
  }

  const tagNames = tags.split(',').map(tag => tag.trim().toLowerCase());

  try {
    await dbConnect();

    const tagDocs = await Tag.find({ name: { $in: tagNames } }).select('_id');
    const tagIds = tagDocs.map(tag => tag._id);

    const posts = await Post.find({ tags: { $in: tagIds } })
      .populate('tags', 'name') // Include tag names
      .populate('author', 'username email') // Include author details
      .exec();

    const tagOrder = {};
    tagNames.forEach((tag, index) => {
      tagOrder[tag] = index;
    });

    posts.sort((a, b) => {
      const aIndex = a.tags.find(t => tagOrder[t.name] !== undefined)?.name;
      const bIndex = b.tags.find(t => tagOrder[t.name] !== undefined)?.name;
      return tagOrder[aIndex] - tagOrder[bIndex];
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}