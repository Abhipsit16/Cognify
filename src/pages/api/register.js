// pages/api/register.js
import User from '@/lib/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = new User({
        username,
        email,
        password,
        clientId: generateClientId(), // Generate client ID as needed
        socketId: '', // Leave empty or set later when connected
      });

      await newUser.save();

      // Send back the new user data, including the auto-generated _id
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error registering user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function generateClientId() {
  // Implement client ID generation logic here (e.g., using UUID or random string)
  return 'some-client-id';
}
