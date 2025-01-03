import dbConnect from '@/lib/mongodb';
import Tag from "@/lib/models/Tag";

async function getTagsbyIds(tagIds) {
  await dbConnect();
  try {
    const tags = await Tag.find({
      '_id': { $in: tagIds }
    }).lean();
    return tags.map(tag => tag.name);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}


// { tags: ['tag1', 'tag2', ...] }
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { tagIDs } = req.body;
      
      if (!tagIDs || !Array.isArray(tagIDs)) {
        return res.status(400).json({ error: 'Invalid tag IDs format' });
      }

      const tagNames = await getTagsbyIds(tagIDs);
      
      if (!tagNames.length) {
        return res.status(404).json({ error: 'No tags found' });
      }
      
      return res.status(200).json({ tags: tagNames });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
