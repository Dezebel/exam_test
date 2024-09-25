import { model, Schema, Types } from 'mongoose'

import type { Post } from './post.model'
import type { User } from './user.model'

export type Comment = {
  _id: Types.ObjectId
  post: Types.ObjectId
  user: Types.ObjectId
  content: string
}

const commentSchema = new Schema<Comment>({
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
})

const CommentModel = model<Comment>('Comment', commentSchema)

export async function getCommentsByPostId(postId: string | Types.ObjectId) {
  return await CommentModel.find({ post: postId })
    .populate<{ user: User }>('user', 'username')
    .lean()
}

export async function getCommentsByUserId(userId: string | Types.ObjectId) {
  return await CommentModel.find({ user: userId })
    .populate<{ post: Post }>('post', 'title')
    .lean()
}

export async function getCommentById(id: string | Types.ObjectId) {
  return await CommentModel.findById(id).populate<{ user: User }>(
    'user',
    'username'
  )
}

export async function createComment(comment: Omit<Comment, '_id'>) {
  return await CommentModel.create(comment)
}

export async function deleteCommentsByPostId(postId: string | Types.ObjectId) {
  await CommentModel.deleteMany({ post: postId })
}
