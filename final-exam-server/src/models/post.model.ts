import { model, Schema, Types } from 'mongoose'

import type { User } from './user.model'

export type Post = {
  _id: Types.ObjectId
  user: Types.ObjectId
  title: string
  content: string
}

const postSchema = new Schema<Post>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
})

const PostModel = model<Post>('Post', postSchema)

export async function getAllPosts() {
  return await PostModel.find()
    .populate<{ user: User }>('user', 'username')
    .lean()
}

export async function getPostById(id: string | Types.ObjectId) {
  return await PostModel.findById(id).populate<{ user: User }>(
    'user',
    'username'
  )
}

export async function getPostsByUserId(userId: string | Types.ObjectId) {
  return await PostModel.find({ user: userId }).lean()
}

export async function createPost(post: Omit<Post, '_id'>) {
  return await PostModel.create(post)
}
