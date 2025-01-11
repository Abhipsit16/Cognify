import dbConnect from '@/lib/mongodb';
import Request from '@/lib/models/Request';
import User from '@/lib/models/User';


async function getUserByClerkId(clerkId) {
  await dbConnect();
  const user = await User.findOne({ clerkId: clerkId }).lean();
  return user;
}
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    // console.log(req.body);
    let { toUser, fromUser } = req.body;
    console.log(toUser, fromUser);
    let query = {};
     

    if (toUser) { 
        toUser = await getUserByClerkId(toUser);
        query.toUser = toUser};
    if (fromUser) {
        fromUser = await getUserByClerkId(fromUser);
        query.fromUser = fromUser};
    console.log(query);

    try {
      const requests = await Request.find(query).lean();
      console.log(requests);
      return res.status(200).json({ requests });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
