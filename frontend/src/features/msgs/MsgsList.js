import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {
  fetchMsgs,
} from './msgsSlice'

// let PostExcerpt = ({ postId }) => {

//   const post = useSelector((state) => selectPostById(state, postId))

//   return (
//     <article className="post-excerpt" key={post.id}>
//       <h3>{post.title}</h3>
//       <div>
//         <PostAuthor userId={post.user} />
//         <TimeAgo timestamp={post.date} />
//       </div>
//       <p className="post-content">{post.content.substring(0, 100)}</p>

//       <ReactionButtons post={post} />
//       <Link to={`/posts/${post.id}`} className="button muted-button">
//         View Post
//       </Link>
//     </article>
//   )
// }

export const MsgsList = () => {
  const dispatch = useDispatch()
 

  const msgs = useSelector((state)=>state.msgs.msgs)
  // console.log('msgs ',msgs)

  useEffect(() => {
    dispatch(fetchMsgs())
    }
  , [ ])



  return (
    <section className="posts-list">
      <h2>Msgs</h2>
      
      {msgs?.map( msg => <p key={msg._id}>{msg.text}</p> )}
    
    </section>
  )
}
