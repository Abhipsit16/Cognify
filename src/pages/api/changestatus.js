import connectDb from "@/lib/mongodb";
import Request from "@/lib/models/Request";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await connectDb();
        const { requestId, status } = req.body;

        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status: status },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        return res.status(200).json({ message: 'Status updated successfully', request: updatedRequest });
    } catch (error) {
        console.error('Error updating request status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
