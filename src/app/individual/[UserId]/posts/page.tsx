function UserPosts({params}:{params :{ UserID : string}}) {
  return (
    <div>
      <h1>User Posts {params.UserID}</h1>

    </div>
  )
}

export default UserPosts
