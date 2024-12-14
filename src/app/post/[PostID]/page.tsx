function Post({params}:{params :{ PostID : string}}) {
  return (
    <div>
      <h1>Post {params.PostID}</h1>
    </div>
  )
}

export default Post
