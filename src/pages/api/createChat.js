import dbConnect from "../../lib/mongodb";
import Chat from "../../lib/models/Chat";
import User from "../../lib/models/User";

async function getUserByClerkId(clerkId) {
    await dbConnect();
    const user = await User.findOne({ clerkId: clerkId }).lean();
    return user;
}

async function createRoomId(user1, user2) {
    const roomId = user1 + user2;
    return roomId;
}

export default async function handler(req, res) {
    await dbConnect();
    if(req.method==="POST"){
        try {
            const { user1, user2 } = req.body;
            if (!user1 || !user2) {
                return res.status(400).json({ success: false, error: "Missing required fields" });
            }
            const user1Data = await getUserByClerkId(user1);
            const user2Data = await getUserByClerkId(user2);
            if (!user1Data || !user2Data) {
                return res.status(404).json({ success: false, error: "User not found" });
            }
            const roomId = await createRoomId(user1, user2);
            const chat = await Chat.create({ roomId, users: [user1Data._id, user2Data._id] });
            return res.status(201).json({ success: true, data: chat });
        } catch (error) {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
}