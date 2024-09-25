import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { get, post, put } from '../http'
import type { Post } from '../types'

type PostFormProps = {
  id?: string
}

export default function PostForm({ id }: PostFormProps) {
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSavePost = async () => {
    try {
      if (id) {
        await put(`/api/posts/${id}`, { title, content })
        navigate(`/post/${id}`)
      } else {
        const newPostId = await post<Partial<Post>, string>('/api/posts', {
          title,
          content,
        })
        navigate(`/post/${newPostId}`)
      }
    } catch (err) {
      alert((err as Error).message)
    }
  }

  const fetchPost = useCallback(async () => {
    try {
      const post = await get<Post>(`/api/posts/${id}`)
      setTitle(post.title)
      setContent(post.content)
    } catch (err) {
      alert((err as Error).message)
      navigate('/')
    }
  }, [navigate, id])

  useEffect(() => {
    if (id) {
      setIsFetching(true)
      fetchPost()
      setIsFetching(false)
    }
  }, [fetchPost, id])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleSavePost()
      }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isFetching}
      />
      <textarea
        cols={40}
        rows={8}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isFetching}
      />
      <button type="submit" disabled={!title || !content}>
        Save
      </button>
    </form>
  )
}
