import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { UserContext } from '../contexts'
import { PostForm } from '../components'

export default function PostEditor() {
  const { user } = useContext(UserContext)
  const { postId } = useParams()

  if (!user) return <Navigate to="/login" />

  return (
    <>
      <h1>{postId ? 'Edit Post' : 'New Post'}</h1>
      <PostForm id={postId} />
    </>
  )
}
