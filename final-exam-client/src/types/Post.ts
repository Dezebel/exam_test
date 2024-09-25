import type { Comment } from './Comment'
import type { User } from './User'

export type Post = {
  _id: string
  user: Pick<User, '_id' | 'username'>
  title: string
  content: string
  comments: Comment[]
}
