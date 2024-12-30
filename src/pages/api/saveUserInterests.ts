import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Tag from '@/lib/models/Tag';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { interests, role, user } = req.body; // Add role to destructuring
    
    await dbConnect();

    let existingUser = await User.findOne({ clerkId: user.id });

    const interestTags = interests.split(',').map(tag => tag.trim());

    const tags = await Promise.all(
      interestTags.map(async (tag) => {
        let existingTag = await Tag.findOne({ name: tag });
        if (!existingTag) {
          existingTag = await Tag.create({ name: tag });
        }
        return existingTag._id;
      })
    );

    if (!existingUser) {
      existingUser = await User.create({
        clerkId: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        tags: tags,
        role: role, // Add role field
      });
    } else {
      existingUser.email = user.email;
      existingUser.username = user.username;
      existingUser.firstName = user.firstName;
      existingUser.lastName = user.lastName;
      existingUser.tags = tags;
      existingUser.role = role; // Add role field
      await existingUser.save();
    }

    res.status(200).json({ message: 'User interests and role saved successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
