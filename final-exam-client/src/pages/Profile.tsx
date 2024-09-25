import { useContext, useCallback, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { UserContext } from '../contexts'
import { get, del } from '../http'
import type { Me } from '../types'

export default function Profile() {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [me, setMe] = useState<Me>()

  const fetchMe = useCallback(async () => {
    try {
      setMe(await get('/api/me'))
    } catch (err) {
      alert((err as Error).message)
      logout()
      navigate('/')
    }
  }, [logout, navigate])

  const deleteItem = async (type: 'post' | 'comment', id: string) => {
    if (!window.confirm(`Are you sure to delete this ${type}?`)) {
      return
    }
    try {
      await del(`/api/${type}s/${id}`)
      setMe({
        posts: me?.posts.filter(({ _id }) => _id !== id) || [],
        comments: me?.comments.filter(({ _id }) => _id !== id) || [],
      })
    } catch (err) {
      alert((err as Error).message)
      navigate('/')
    }
  }

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  if (!user) return <Navigate to="/login" />
  if (!me) return <p>Fetching user profile...</p>

  const { posts, comments } = me

  return (
    <>
      <h1>Profile</h1>
      <button type="button" onClick={() => navigate('/new-post')}>
        Create a new post
      </button>
      <h2>My posts</h2>
      {posts.length === 0 && <p>You don't have any post...</p>}
      {posts.length > 0 && (
        <ul>
          {posts.map(({ _id, title }) => (
            <li key={_id}>
              <h3>{title}</h3>
              <div>
                <button type="button" onClick={() => navigate(`/post/${_id}`)}>
                  View
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/edit-post/${_id}`)}
                >
                  Edit
                </button>
                <button type="button" onClick={() => deleteItem('post', _id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2>My comments</h2>
      {/*
      Task 3 (7 points):
      Render a list of comments from the logged-in user, each list item should 
      include:
      - the comment content in span tag,
      - the commented post title in q tag, 
      - a view button that opens the post details pageand unfold the selected 
        comment automatically,  
      - a delete button that allows the user to delete the comment.
      If no previous comments, render a message "You don't have any comment..."
      in p tag
      
      Hint: you can pass a state as an option when calling `navigate` function
      */}
    </>
  )
}
