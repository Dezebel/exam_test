import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { get } from '../http'
import type { Post } from '../types'

export default function Home() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState<Omit<Post, 'comments'>[]>([])
  const [keyword, setKeyword] = useState('')

  const fetchPosts = async () => setPosts(await get<Post[]>('/api/posts'))

  useEffect(() => {
    fetchPosts()
  }, [])

  if (posts.length === 0) return <p>Loading posts...</p>

  // Filter posts by title using the keyword
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(keyword.toLowerCase())
  )

  return (
    <>
      <h1>Posts</h1>
      <input
        placeholder="Search"
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <ul>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(({ _id, title, content, user }) => (
            <li key={_id}>
              <h2>{title}</h2>
              <span>{content}</span>
              <em> - by {user.username}</em>
              <button onClick={() => navigate(`post/${_id}`)}>View</button>
            </li>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </ul>
    </>
  )
}
