import React from 'react'
import { useField, useEventHandler } from '../utils/hooks'
import { useParams } from 'react-router-dom'

const Comments = ({ comments }) => {
  const comment = useField('comment')
  const eventHandler = useEventHandler()
  const id = useParams().id

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={eventHandler.commentHandler(comment, id)}>
        <input {...comment.input}/>
        <button id="comment-button" type="submit">
          Add Comment
        </button>
      </form>
      <ul>
        {comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Comments