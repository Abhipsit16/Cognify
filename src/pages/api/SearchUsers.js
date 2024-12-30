// import { NextResponse } from "next/server";
// import User from "@/lib/models/User"; // Assuming you have a User model
// // import dbconnect() from "@/lib/mongodb";
// import dbConnect from '@/lib/mongodb'; // Assume you have a DB instance or connection.
// import { NextResponse } from "next/server";
import dbConnect from '@/lib/mongodb';
import User from "@/lib/models/User";





async function alluser(){
    await dbConnect();
    const users = await User.find({}).lean();
    return users 
  }

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const users = await User.find({}).lean();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
    //   const { username } = req.body;
    //   const user = await User.create({ username, password, email });
      const user = alluser();
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}









// export default async function handler(req , res) {
//   const url = new URL(req.url);
//   const query = url.searchParams.get("query");

  

//   try {
//     // Example database query
//     // const results = await db.query(
//     //   "SELECT name FROM items WHERE name ILIKE $1 LIMIT 10",
//     //   [`%${query}%`]
//     // );
//     // await dbConnect();
//     const results = jaiho();

//     return NextResponse.json( results );
//   } catch (error) {
//     console.error("Error querying the database:", error);
//     return NextResponse.json({ results: [] });
//   }
// }