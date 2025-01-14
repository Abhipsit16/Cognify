import dbConnect from '@/lib/mongodb';  
import Post from '@/lib/models/Post';
import Tag from '@/lib/models/Tag';
import User from '@/lib/models/User';

async function getUserByClerkId(clerkId) {
  await dbConnect();
  const user = await User.findOne({ clerkId: clerkId }).lean();
  return user;
}
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      console.log('req.body:', req.body);
      const { heading, content, type, authorID, Post_tags, dataSample, dataLink, accessLevel } = req.body;
      
      if (!heading || !content || !type || !authorID || !Post_tags) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
      }

      const user = await getUserByClerkId(authorID);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Convert comma-separated tags to array and trim whitespace
      const tagsArray = Post_tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      
      const tags = await Promise.all(
        tagsArray.map(async (tag) => {
          let existingTag = await Tag.findOne({ name: tag });
          if (!existingTag) {
            existingTag = await Tag.create({ name: tag });
          }
          return existingTag._id;
        })
      );

      let data = null;
      if (dataLink) {
        data = {
          datalink: dataLink,
          AccessUsers: [user._id],
          AccessLevel: accessLevel,
        };
      }

      const postData = {
        heading,
        content,
        Type: type,
        author: user._id,
        tags,
        AccessLevel: accessLevel,
      };

      if (dataSample) postData.dataSample = dataSample;
      if (data) postData.dataLink = data;

      console.log('postData:', postData);

      const newPost = new Post(postData);
      await newPost.save();
      
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      console.error('Post creation error:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};
