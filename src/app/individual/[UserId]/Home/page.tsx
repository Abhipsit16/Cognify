import dbConnect from '../../../../lib/mongodb';
import User from '../../../../lib/models/User';


async function userdata(){
  await dbConnect();
    try {
      const user = await User.create({
      username: "Mike",
      password: "1234",
      email: "mike@test.com",
      })
    
      console.log(user)
      } catch (e) {
      console.log(e.message)
      
      }


  const users = await User.find({}).lean();
  return users
}

async function UserHome({params}:{params :{ UserID : string}}) {
  const users = await userdata()
  return (
    <div>
      <h1>User Home {params.UserID}</h1>
      <ul>
         {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>

    </div>
    
  )
}

export default UserHome
