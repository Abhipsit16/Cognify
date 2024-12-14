import React from 'react'

function Collaborations({params}:{params :{ CollabID : string}}) {
  return (
    <div>
      <h1>Post {params.CollabID}</h1>
    </div>
  )
}

export default Collaborations