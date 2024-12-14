import React from 'react'

function Chat({params}:{params :{ ChatID : string}}) {
  return (
    <div>
      <h1>Post {params.ChatID}</h1>
    </div>
  )
}

export default Chat