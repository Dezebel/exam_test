import type { User } from './User'

export type Comment = {
  _id: string
  content: string
  user: Pick<User, '_id' | 'username'>
  post: string
}
