import type { Post } from './Post'
import type { Comment } from './Comment'

export type User = {
  _id: string
  username: string
  token: string
}

export type Credential = {
  username: string
  password: string
}

type MyComment = Omit<Comment, 'user' | 'post'> & { post: Post }

export type Me = {
  posts: Post[]
  comments: MyComment[]
}
