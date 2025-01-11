import dbConnect from "../../lib/mongodb";
import Chat from "../../lib/models/Chat";
import User from "../../lib/models/User";

async function getUserByClerkId(clerkId) {
    await dbConnect();
    const user = await User.findOne({ clerkId: clerkId });
    return user;
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ success: false, error: "Method not allowed" });
    }

    try {
        await dbConnect();
        const { user1ClerkId, user2ClerkId } = req.body;

        console.log('Creating chat for users:', { user1ClerkId, user2ClerkId });

        if (!user1ClerkId || !user2ClerkId) {
            console.error('Missing user IDs:', { user1ClerkId, user2ClerkId });
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        // Get MongoDB User documents from clerk IDs
        const user1 = await getUserByClerkId(user1ClerkId);
        const user2 = await getUserByClerkId(user2ClerkId);

        console.log('Found users:', { 
            user1: user1?._id, 
            user2: user2?._id 
        });

        if (!user1 || !user2) {
            console.error('Users not found:', { user1ClerkId, user2ClerkId });
            return res.status(404).json({ success: false, error: "One or both users not found" });
        }

        // Check if chat already exists with these participants
        const existingChat = await Chat.findOne({
            participants: { 
                $all: [user1._id, user2._id],
                $size: 2
            }
        });

        if (existingChat) {
            console.log('Found existing chat:', existingChat._id);
            return res.status(200).json({ 
                success: true, 
                chatId: existingChat._id.toString(), // Convert ObjectId to string
                isExisting: true 
            });
        }

        // Create new chat if none exists
        const newChat = await Chat.create({
            participants: [user1._id, user2._id],
            messages: []
        });

        console.log('Created new chat:', newChat._id);

        return res.status(201).json({ 
            success: true, 
            chatId: newChat._id.toString(), // Convert ObjectId to string
            isExisting: false 
        });

    } catch (error) {
        console.error('Create chat error:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}