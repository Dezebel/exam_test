import { useCallback, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { CommentForm } from '../components'
import { UserContext } from '../contexts'
import { get } from '../http'
import type { Post } from '../types'

export default function PostDetails() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { postId = '' } = useParams()
  const [post, setPost] = useState<Post>()

  const fetchPost = useCallback(async () => {
    try {
      setPost(await get<Post>(`/api/posts/${postId}`))
    } catch (err) {
      alert((err as Error).message)
      navigate('/')
    }
  }, [navigate, postId])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  if (!post) return <p>Fetching post details...</p>

  const {
    user: { username },
    title,
    content,
    comments,
  } = post

  return (
    <>
      <h1>{title}</h1>
      <em>
        - by <strong>{username}</strong>
      </em>
      <p>{content}</p>
      <hr />
      <h2>Comments</h2>
      {!comments.length && <p>Be first to comment...</p>}
      {comments.map(({ _id, user: { username }, content }) => (
        <details key={_id} id={_id} open={location.state?.commentId === _id}>
          <summary>
            from <strong>{username}</strong>
          </summary>
          <p>{content}</p>
        </details>
      ))}
      <hr />
      {!user && <p>Please login to comment</p>}
      {!!user && (
        <CommentForm
          postId={postId}
          onSaveSucceeded={(id, commentContent) => {
            const newComment = {
              _id: id,
              content: commentContent,
              post: postId,
              user: {
                _id: user._id,
                username: user.username,
              },
            }
            setPost({ ...post, comments: [...post.comments, newComment] })
          }}
        />
      )}
    </>
  )
}
