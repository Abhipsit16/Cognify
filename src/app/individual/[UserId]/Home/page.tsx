
function UserHome({params}:{params :{ UserID : string}}) {
  return (
    <div>
      <h1>User Home {params.UserID}</h1>

    </div>
  )
}

export default UserHome
